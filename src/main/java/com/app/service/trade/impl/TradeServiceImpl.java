package com.app.service.trade.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.app.dao.trade.TradeDAO;
import com.app.dto.trade.Trade;
import com.app.service.trade.TradeService;

@Service
public class TradeServiceImpl implements TradeService {
    @Autowired
    TradeDAO tradeDAO;

    @Override
    public List<Trade> getOrderList() {
        return tradeDAO.getOrderList();
    }

    @Override
    public void processPayment(Trade order) {
        tradeDAO.processPayment(order);
    }

    @Override
    public String getShippingStatus(int tradeId) {
        return tradeDAO.getShippingStatus(tradeId);
    }

    @Override
    public void updateShippingStatus(Trade order) {
        tradeDAO.updateShippingStatus(order);
    }

    @Override
    public void handleDispute(Trade order) {
        tradeDAO.handleDispute(order);
    }

    @Override
    public void processRefund(Trade order) {
        tradeDAO.processRefund(order);
    }

    @Override
    public List<Trade> getRefundHistory() {
        return tradeDAO.getRefundHistory();
    }
}