package com.app.service.buy.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.buy.BuyDAO;
import com.app.dto.buy.Buy;
import com.app.service.buy.BuyService;

@Service
public class BuyServiceImpl implements BuyService {
	
	@Autowired
	BuyDAO buyDAO;

	@Override
	public int saveBuyInfo(Buy buy) {
		int result = buyDAO.saveBuyInfo(buy);
		return result;
	}

	
	
}
