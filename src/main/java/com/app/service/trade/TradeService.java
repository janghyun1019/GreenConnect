package com.app.service.trade;

import java.util.List;
import com.app.dto.trade.Trade;

public interface TradeService {
    List<Trade> getOrderList();
    void processPayment(Trade order);
    String getShippingStatus(int tradeId);
    void updateShippingStatus(Trade order);
    void handleDispute(Trade order);
    void processRefund(Trade order);
    List<Trade> getRefundHistory();
}