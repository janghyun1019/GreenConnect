package com.app.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.trade.Trade;
import com.app.service.trade.TradeService;

@RestController
@RequestMapping("/admin/trade")
public class TradeController {
    @Autowired
    TradeService tradeService;

    @GetMapping("/list")
    public List<Trade> getOrders() {
        return tradeService.getOrderList();
    }

    @PostMapping("/processPayment")
    public String processPayment(@RequestBody Trade order) {
        tradeService.processPayment(order);
        return "결재완료";
    }

    @GetMapping("/shipping/{tradeId}")
    public String getShippingStatus(@PathVariable int tradeId) {
        return tradeService.getShippingStatus(tradeId);
    }

    @PostMapping("/updateShipping")
    public String updateShippingStatus(@RequestBody Trade order) {
        tradeService.updateShippingStatus(order);
        return "배송상태 업데이트 완료";
    }

    @PostMapping("/dispute")
    public String handleDispute(@RequestBody Trade order) {
        tradeService.handleDispute(order);
        return "분쟁이 접수되었습니다.";
    }

    @PostMapping("/processRefund")
    public String processRefund(@RequestBody Trade order) {
        tradeService.processRefund(order);
        return "환불이 완료되었습니다.";
    }

    @GetMapping("/refunds")
    public List<Trade> getRefundHistory() {
        return tradeService.getRefundHistory();
    }
}