package com.app.dao.trade.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.trade.TradeDAO;
import com.app.dto.trade.Trade;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Repository
public class TradeDAOImpl implements TradeDAO {
    private static final Logger logger = LogManager.getLogger(TradeDAOImpl.class);

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public List<Trade> getOrderList() {
        try {
            return sqlSessionTemplate.selectList("Trade_mapper.getOrderList");
        } catch (Exception e) {
            logger.error("Error fetching order list: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public void processPayment(Trade order) {
        try {
            sqlSessionTemplate.update("Trade_mapper.processPayment", order);
        } catch (Exception e) {
            logger.error("Error processing payment: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public String getShippingStatus(int tradeId) {
        try {
            return sqlSessionTemplate.selectOne("Trade_mapper.getShippingStatus", tradeId);
        } catch (Exception e) {
            logger.error("Error fetching shipping status: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public void updateShippingStatus(Trade order) {
        try {
            sqlSessionTemplate.update("Trade_mapper.updateShippingStatus", order);
        } catch (Exception e) {
            logger.error("Error updating shipping status: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public void handleDispute(Trade order) {
        try {
            sqlSessionTemplate.insert("Trade_mapper.handleDispute", order);
        } catch (Exception e) {
            logger.error("Error handling dispute: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public void processRefund(Trade order) {
        try {
            sqlSessionTemplate.update("Trade_mapper.processRefund", order);
        } catch (Exception e) {
            logger.error("Error processing refund: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public List<Trade> getRefundHistory() {
        try {
            return sqlSessionTemplate.selectList("Trade_mapper.getRefundHistory");
        } catch (Exception e) {
            logger.error("Error fetching refund history: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }
}