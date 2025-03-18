package com.app.dao.gpay.impl;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.gpay.GpayDAO;
import com.app.dto.gpay.GpayCharge;
import com.app.dto.gpay.GpayProperty;

@Repository
public class GpayDAOImpl implements GpayDAO {
	
	@Autowired
	SqlSessionTemplate sqlSessionTemplate;

	@Override
	public GpayProperty getGpayInfoByUserId(GpayProperty userId) {
		GpayProperty gpayProperty = sqlSessionTemplate.selectOne("gpay_mapper.getGpayInfoByUserId", userId);
		return gpayProperty;
	}

	@Override
	public int gpayChargeByUserId(GpayCharge gpayCharge) {
		int result = sqlSessionTemplate.insert("gpay_mapper.gpayChargeByUserId", gpayCharge);
		return result;
	}
	
	@Override
	public GpayProperty findUserIdFromGpayProperty(GpayCharge gpayCharge) {
		GpayProperty result = sqlSessionTemplate.selectOne("gpay_mapper.findUserIdFromGpayProperty", gpayCharge);
		return result;
	}

	@Override
	public int addGpayPropertyByUserId(GpayCharge gpayCharge) {
		int result = sqlSessionTemplate.insert("gpay_mapper.addGpayPropertyByUserId", gpayCharge);
		return result;
	}

	@Override
	public int updateGpayPropertyByUserId(GpayCharge gpayCharge) {
		int result = sqlSessionTemplate.update("gpay_mapper.updateGpayPropertyByUserId", gpayCharge);
		return result;
	}
	
	

}
