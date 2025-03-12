package com.app.controller;

import com.app.dto.marketInfo.MarketInfoDTO;
import com.app.service.marketInfo.MarketInfoService;
import com.app.utill.MarketInfoParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

@Controller
public class MarketInfoController {

    @Autowired // MarketInfoService 자동 주입
    private MarketInfoService marketInfoService;

    @GetMapping("/fetchMarketData")
    @ResponseBody
    public String fetchMarketData(@RequestParam String apiUrl) {
        try {
            URL url = new URL(apiUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            List<MarketInfoDTO> marketInfoList = MarketInfoParser.parseMarketInfo(conn.getInputStream());

            marketInfoService.saveMarketInfo(marketInfoList);
            return "데이터 저장 완료!";
        } catch (Exception e) {
            return "API 호출 실패: " + e.getMessage();
        }
    }

    @GetMapping("/getMarketData")
    @ResponseBody
    public List<MarketInfoDTO> getMarketData() {
        return marketInfoService.getMarketInfo();
    }
}
