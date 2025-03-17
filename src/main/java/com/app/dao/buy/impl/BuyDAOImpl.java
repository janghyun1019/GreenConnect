package com.app.dao.buy.impl;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.buy.BuyDAO;
import com.app.dto.buy.Buy;

@Repository
public class BuyDAOImpl implements BuyDAO {
	
	@Autowired
	SqlSessionTemplate sqlSessionTemplate;

	@Override
	public int saveBuyInfo(Buy buy) {
		int result = sqlSessionTemplate.insert("buy_mapper.saveBuyInfo", buy);
		
		return result;
	}

	@Override
	public Buy getBuyInfoByUserIdAndPostId(Buy buy) {
		Buy buyInfo = sqlSessionTemplate.selectOne("buy_mapper.getBuyInfoByUserIdAndPostId", buy);
		return buyInfo;
	}

	@Override
	public int payProduct(Buy buy) {
		int result = sqlSessionTemplate.update("buy_mapper.payProduct", buy);
		return result;
	}
	
	

}
