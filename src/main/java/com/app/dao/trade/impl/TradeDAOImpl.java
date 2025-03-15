package com.app.dao.trade.impl;

import java.util.List;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.app.dao.trade.TradeDAO;
import com.app.dto.trade.Trade;

@Repository
public class TradeDAOImpl implements TradeDAO {
    @Autowired
    SqlSessionTemplate sqlSessionTemplate;

    @Override
    public List<Trade> getOrderList() {
        return sqlSessionTemplate.selectList("Trade_mapper.getOrderList");
    }

    @Override
    public void processPayment(Trade order) {
        sqlSessionTemplate.update("Trade_mapper.processPayment", order);
    }

    @Override
    public String getShippingStatus(int tradeId) {
        return sqlSessionTemplate.selectOne("Trade_mapper.getShippingStatus", tradeId);
    }

    @Override
    public void updateShippingStatus(Trade order) {
        sqlSessionTemplate.update("Trade_mapper.updateShippingStatus", order);
    }

    @Override
    public void handleDispute(Trade order) {
        sqlSessionTemplate.insert("Trade_mapper.handleDispute", order);
    }

    @Override
    public void processRefund(Trade order) {
        sqlSessionTemplate.update("Trade_mapper.processRefund", order);
    }

    @Override
    public List<Trade> getRefundHistory() {
        return sqlSessionTemplate.selectList("Trade_mapper.getRefundHistory");
    }
}