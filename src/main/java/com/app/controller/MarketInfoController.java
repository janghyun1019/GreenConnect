package com.app.controller;

import com.app.dto.marketInfo.MarketInfoDTO;
import com.app.service.marketInfo.MarketInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/market")
public class MarketInfoController {

    @Autowired
    private MarketInfoService marketInfoService;

    // 전체 도매가격 데이터 조회 (날짜 필터링 가능)
    @GetMapping("/getMarketData")
    public List<MarketInfoDTO> getMarketData(@RequestParam(required = false) String date) {
        List<MarketInfoDTO> data;
        if (date == null || date.isEmpty()) {
            data = marketInfoService.getMarketInfo(); // 전체 데이터 조회
        } else {
            data = marketInfoService.getMarketInfoByDate(date); // 특정 날짜 데이터 조회
        }
        
        // ✅ JSON 응답 확인용 로그 (G_NAME이 포함되는지 확인!)
        System.out.println("Market Data Response: " + data);
        
        return data;
    }

    // 최신 도매가격 데이터 조회
    @GetMapping("/getLatestMarketData")
    public List<MarketInfoDTO> getLatestMarketData() {
        return marketInfoService.getLatestMarketInfo();
    }
}
