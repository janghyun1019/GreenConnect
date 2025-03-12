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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.marketInfo.MarketInfoDAO;
import com.app.dto.marketInfo.MarketInfoDTO;

@Service
public class MarketInfoServiceImpl implements MarketInfoService {

    private static final Logger logger = LoggerFactory.getLogger(MarketInfoServiceImpl.class);
    private static final String API_BASE_URL = "https://api.odcloud.kr/api/15134857/v1/uddi:fce62244-...";
    private static final String SERVICE_KEY = "${api.service.key}"; // application.properties에서 관리

    private final MarketInfoDAO marketInfoDAO;

    public MarketInfoServiceImpl(MarketInfoDAO marketInfoDAO) {
        this.marketInfoDAO = marketInfoDAO;
    }

    @Override
    @Transactional
    public int fetchAndSaveMarketData(String date) {
        int savedCount = 0;
        try {
            // 1) API 호출
            String jsonText = callApi(date);

            // 2) JSON 파싱 → List<MarketInfoDTO>
            List<MarketInfoDTO> dataList = parseJson(jsonText);

            // 3) DB 배치 저장 (성능 개선)
            if (!dataList.isEmpty()) {
                for (MarketInfoDTO dto : dataList) {
                    savedCount += marketInfoDAO.insertMarketInfo(dto);
                }
                logger.info("Successfully saved {} market data records for date: {}", savedCount, date);
            } else {
                logger.warn("No market data retrieved for date: {}", date);
            }
        } catch (Exception e) {
            logger.error("Error fetching or saving market data for date: {}. Error: {}", date, e.getMessage(), e);
            throw new MarketDataException("Failed to process market data: " + e.getMessage(), e);
        }
        return savedCount;
    }

    @Override
    public List<MarketInfoDTO> getAllData() {
        return marketInfoDAO.selectAll();
    }

    // --------------------- API 호출 ---------------------
    private String callApi(String date) throws Exception {
        StringBuilder urlBuilder = new StringBuilder(API_BASE_URL);
        urlBuilder.append("?serviceKey=").append(SERVICE_KEY);
        urlBuilder.append("&returnType=json");
        urlBuilder.append("&page=1&perPage=10");
        if (date != null && !date.isEmpty()) {
            urlBuilder.append("&date=").append(date); // date 파라미터 추가
        }

        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setConnectTimeout(5000); // 타임아웃 설정
        conn.setReadTimeout(5000);

        BufferedReader rd;
        try {
            if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            } else {
                rd = new BufferedReader(new InputStreamReader(conn.getErrorStream(), "UTF-8"));
                logger.error("API call failed with response code: {}", conn.getResponseCode());
                throw new Exception("API request failed with code: " + conn.getResponseCode());
            }

            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            rd.close();
            return sb.toString();
        } finally {
            conn.disconnect();
        }
    }

    // --------------------- JSON 파싱 ---------------------
    private List<MarketInfoDTO> parseJson(String jsonText) throws ParseException {
        List<MarketInfoDTO> list = new ArrayList<>();
        JSONParser parser = new JSONParser();
        JSONObject root = (JSONObject) parser.parse(jsonText);

        JSONArray dataArr = (JSONArray) root.get("data");
        if (dataArr == null || dataArr.isEmpty()) {
            logger.warn("No data found in JSON response");
            return list;
        }

        for (Object obj : dataArr) {
            if (!(obj instanceof JSONObject)) continue;
            JSONObject item = (JSONObject) obj;
            MarketInfoDTO dto = new MarketInfoDTO(0, jsonText, jsonText, jsonText, null);

            dto.setItemName(toStr(item.get("품목명")));
            dto.setMarketName(toStr(item.get("도매시장명")));
            dto.setGrade(toStr(item.get("등급")));
            dto.setUnit(toStr(item.get("단위")));
            dto.setAvgPrice(toInt(item.get("평균가")));
            dto.setMaxPrice(toInt(item.get("최고가")));
            dto.setMinPrice(toInt(item.get("최저가")));

            list.add(dto);
        }
        return list;
    }

    private String toStr(Object obj) {
        return obj != null ? obj.toString() : "";
    }

    private int toInt(Object obj) {
        try {
            return obj != null ? Integer.parseInt(obj.toString()) : 0;
        } catch (NumberFormatException e) {
            logger.warn("Failed to parse integer value: {}", obj, e);
            return 0;
        }
    }
}

// 커스텀 예외 클래스 (필요 시)
class MarketDataException extends RuntimeException {
    public MarketDataException(String message, Throwable cause) {
        super(message, cause);
    }
}