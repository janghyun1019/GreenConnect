package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.trade.Trade;
import com.app.service.trade.TradeService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@RestController
@RequestMapping("/admin/trade")
public class TradeController {
    private static final Logger logger = LogManager.getLogger(TradeController.class);

    @Autowired
    private TradeService tradeService;

    @GetMapping("/list")
    public ResponseEntity<List<Trade>> getOrders() {
        try {
            List<Trade> trades = tradeService.getOrderList();
            return ResponseEntity.ok(trades);
        } catch (Exception e) {
            logger.error("Error fetching trade list: " + e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/processPayment")
    public ResponseEntity<String> processPayment(@RequestBody Trade order) {
        try {
            tradeService.processPayment(order);
            return ResponseEntity.ok("결제 완료");
        } catch (Exception e) {
            logger.error("Error processing payment: " + e.getMessage());
            return ResponseEntity.status(400).body("결제 실패");
        }
    }

    @GetMapping("/shipping/{tradeId}")
    public ResponseEntity<String> getShippingStatus(@PathVariable int tradeId) {
        try {
            String status = tradeService.getShippingStatus(tradeId);
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            logger.error("Error fetching shipping status: " + e.getMessage());
            return ResponseEntity.status(500).body("상태 조회 실패");
        }
    }

    @PostMapping("/updateShipping")
    public ResponseEntity<String> updateShippingStatus(@RequestBody Trade order) {
        try {
            tradeService.updateShippingStatus(order);
            return ResponseEntity.ok("배송 상태 업데이트 완료");
        } catch (Exception e) {
            logger.error("Error updating shipping status: " + e.getMessage());
            return ResponseEntity.status(400).body("업데이트 실패");
        }
    }

    @PostMapping("/dispute")
    public ResponseEntity<String> handleDispute(@RequestBody Trade order) {
        try {
            tradeService.handleDispute(order);
            return ResponseEntity.ok("분쟁이 접수되었습니다.");
        } catch (Exception e) {
            logger.error("Error handling dispute: " + e.getMessage());
            return ResponseEntity.status(400).body("접수 실패");
        }
    }

    @PostMapping("/processRefund")
    public ResponseEntity<String> processRefund(@RequestBody Trade order) {
        try {
            tradeService.processRefund(order);
            return ResponseEntity.ok("환불이 완료되었습니다.");
        } catch (Exception e) {
            logger.error("Error processing refund: " + e.getMessage());
            return ResponseEntity.status(400).body("환불 실패");
        }
    }

    @GetMapping("/refunds")
    public ResponseEntity<List<Trade>> getRefundHistory() {
        try {
            List<Trade> refunds = tradeService.getRefundHistory();
            return ResponseEntity.ok(refunds);
        } catch (Exception e) {
            logger.error("Error fetching refund history: " + e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }
}