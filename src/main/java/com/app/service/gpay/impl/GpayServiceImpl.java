package com.app.service.gpay.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.gpay.GpayDAO;
import com.app.dto.gpay.GpayCharge;
import com.app.dto.gpay.GpayProperty;
import com.app.service.gpay.GpayService;

@Service
public class GpayServiceImpl implements GpayService {
	
	@Autowired
	GpayDAO gpayDAO;

	@Override
	public GpayProperty getGpayInfoByUserId(GpayProperty userId) {
		GpayProperty gpayProperty = gpayDAO.getGpayInfoByUserId(userId);
		return gpayProperty;
	}

	@Override
	public int gpayChargeByUserId(GpayCharge gpayCharge) {
		int result = gpayDAO.gpayChargeByUserId(gpayCharge);
		return result;
	}

	@Override
	public int addGpayPropertyByUserId(GpayCharge gpayCharge) {
		int result = gpayDAO.addGpayPropertyByUserId(gpayCharge);
		return result;
	}

	@Override
	public GpayProperty findUserIdFromGpayProperty(GpayCharge gpayCharge) {
		GpayProperty result = gpayDAO.findUserIdFromGpayProperty(gpayCharge);
		return result;
	}

	@Override
	public int updateGpayPropertyByUserId(GpayCharge gpayCharge) {
		int result = gpayDAO.updateGpayPropertyByUserId(gpayCharge);
		return result;
	}

	
	
	

}
