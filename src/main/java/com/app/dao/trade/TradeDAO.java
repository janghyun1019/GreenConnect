package com.app.dao.trade;

import java.util.List;
import com.app.dto.trade.Trade;

public interface TradeDAO {
    List<Trade> getOrderList();
    void processPayment(Trade order);
    String getShippingStatus(int tradeId);
    void updateShippingStatus(Trade order);
    void handleDispute(Trade order);
    void processRefund(Trade order);
    List<Trade> getRefundHistory();
}