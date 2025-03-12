package com.app.controller;

import com.app.dto.marketInfo.MarketInfoDTO;
import com.app.service.marketInfo.MarketInfoService;
import com.app.utill.MarketInfoParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

@RestController
@RequestMapping("/market")
public class MarketInfoController {

    @Autowired
    private MarketInfoService marketInfoService;

    // 외부 API 데이터를 가져와 DB에 저장
    @GetMapping("/fetchMarketData")
    public String fetchMarketData(@RequestParam String apiUrl) {
        try {
            URL url = new URL(apiUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            List<MarketInfoDTO> marketInfoList = MarketInfoParser.parseMarketInfo(conn.getInputStream());

            int savedCount = marketInfoService.saveMarketInfo(marketInfoList);
            return savedCount > 0 ? "데이터 저장 완료!" : "저장할 데이터가 없습니다.";
        } catch (Exception e) {
            return "API 호출 실패: " + e.getMessage();
        }
    }

    // 전체 도매가격 데이터 조회 (날짜 필터링 가능)
    @GetMapping("/getMarketData")
    public List<MarketInfoDTO> getMarketData(@RequestParam(required = false) String date) {
        if (date == null || date.isEmpty()) {
            return marketInfoService.getMarketInfo();  // 전체 데이터 조회
        }
        return marketInfoService.getMarketInfoByDate(date);  // 특정 날짜 데이터 조회
    }

    // 최신 도매가격 데이터 조회 (가장 최근 날짜)
    @GetMapping("/getLatestMarketData")
    public List<MarketInfoDTO> getLatestMarketData() {
        return marketInfoService.getLatestMarketInfo();
    }
}
