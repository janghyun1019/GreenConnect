package com.app.service.marketInfo;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import com.app.dao.marketInfo.MarketInfoDAO;
import com.app.dto.marketInfo.MarketInfoDTO;

@Service
public class MarketInfoServiceImpl implements MarketInfoService {

    private final MarketInfoDAO marketInfoDAO;

    // 생성자 주입 (스프링이 MyBatis 매퍼 구현체를 주입)
    public MarketInfoServiceImpl(MarketInfoDAO marketInfoDAO) {
        this.marketInfoDAO = marketInfoDAO;
    }

    @Override
    public int fetchAndSaveMarketData(String date) {
        int savedCount = 0;
        try {
            // 1) API 호출
            String jsonText = callApi(date);

            // 2) JSON 파싱 → List<MarketInfoDTO>
            List<MarketInfoDTO> dataList = parseJson(jsonText);

            // 3) DB 저장
            for (MarketInfoDTO dto : dataList) {
                savedCount += marketInfoDAO.insertMarketInfo(dto);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return savedCount;
    }

    @Override
    public List<MarketInfoDTO> getAllData() {
        return marketInfoDAO.selectAll();
    }

    // --------------------- API 호출 예시 ---------------------
    private String callApi(String date) throws Exception {
        // 실제 인증키 & 파라미터로 수정
        String serviceKey = "YOUR_SERVICE_KEY"; // 공공데이터 인증키
        StringBuilder urlBuilder = new StringBuilder("https://api.odcloud.kr/api/15134857/v1/uddi:fce62244-...");

        // 예: ?serviceKey=xxx&returnType=json&page=1&perPage=10
        urlBuilder.append("?serviceKey=").append(serviceKey);
        urlBuilder.append("&returnType=json");
        urlBuilder.append("&page=1&perPage=10");
        // 필요 시 date 파라미터도 추가

        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        BufferedReader rd;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream(), "UTF-8"));
        }

        StringBuilder sb = new StringBuilder();
        String line;
        while((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        return sb.toString();
    }

    // --------------------- JSON 파싱 예시 ---------------------
    private List<MarketInfoDTO> parseJson(String jsonText) throws ParseException {
        List<MarketInfoDTO> list = new ArrayList<>();
        JSONParser parser = new JSONParser();
        JSONObject root = (JSONObject) parser.parse(jsonText);

        // 예: { "data": [ { "품목명": "...", "도매시장명": "...", ... }, ... ] }
        JSONArray dataArr = (JSONArray) root.get("data");
        if (dataArr == null) return list;

        for (Object obj : dataArr) {
            JSONObject item = (JSONObject) obj;
            MarketInfoDTO dto = new MarketInfoDTO();

            // 실제 JSON 키값(품목명, 도매시장명 등)에 맞춰 세팅
            dto.setItemName( toStr(item.get("품목명")) );
            dto.setMarketName( toStr(item.get("도매시장명")) );
            dto.setGrade( toStr(item.get("등급")) );
            dto.setUnit( toStr(item.get("단위")) );
            dto.setAvgPrice( toInt(item.get("평균가")) );
            dto.setMaxPrice( toInt(item.get("최고가")) );
            dto.setMinPrice( toInt(item.get("최저가")) );

            list.add(dto);
        }
        return list;
    }

    private String toStr(Object obj) {
        return (obj == null) ? "" : obj.toString();
    }
    private int toInt(Object obj) {
        try {
            return Integer.parseInt(toStr(obj));
        } catch (NumberFormatException e) {
            return 0;
        }
    }
}
