package com.app.service.quality.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.quality.QualityDAO;
import com.app.dto.quality.Quality;
import com.app.service.quality.QualityService;

@Service
public class QualityServiceImpl implements QualityService{

	@Autowired
	QualityDAO qualityDAO;
	
	@Override
	public List<Quality> getSellerEvaluations() {
		List<Quality> qualityList = qualityDAO.getSellerEvaluations();
		return qualityList;
	}

	@Override
	public List<Quality> getReviews() {
		List<Quality> qualityList = qualityDAO.getReviews();
		return qualityList;
	}

	@Override
	public List<Quality> getCertificates() {
		List<Quality> qualityList = qualityDAO.getCertificates();
		return qualityList;
	}

}
