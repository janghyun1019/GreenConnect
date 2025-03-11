package com.app.controller;

import com.app.dto.marketInfo.MarketInfoDTO;
import com.app.service.marketInfo.MarketInfoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/marketInfo")
public class MarketInfoController {

    @Autowired
    private MarketInfoService marketInfoService;

    // (1) 공공데이터 → DB 저장
    //  예: GET /marketInfo/fetch?date=2025-03-11
    @GetMapping("/fetch")
    @ResponseBody
    public String fetchData(@RequestParam(required=false) String date) {
        if(date == null) date = "2025-03-11";
        int count = marketInfoService.fetchAndSaveMarketData(date);
        return count + "건 저장 완료!";
    }

    // (2) DB 전체 조회 후 JSP로 포워딩
    //  예: GET /marketInfo/list
    @GetMapping("/list")
    public String getAllData(Model model) {
        List<MarketInfoDTO> list = marketInfoService.getAllData();
        model.addAttribute("marketList", list);
        return "marketInfoList"; 
        // => /WEB-INF/views/marketInfoList.jsp
    }
}
