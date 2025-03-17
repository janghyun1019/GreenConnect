package com.app.dao.quality.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.quality.QualityDAO;
import com.app.dto.quality.Quality;

@Repository
public class QualityDAOImpl implements QualityDAO{

	@Autowired
	SqlSessionTemplate sqlSessionTemplate;
	
	@Override
	public List<Quality> getSellerEvaluations() {
		List<Quality> qualityList = sqlSessionTemplate.selectList("Quality_mapper.getSellerEvaluations");
		return qualityList;
	}

	@Override
	public List<Quality> getReviews() {
		List<Quality> qualityList = sqlSessionTemplate.selectList("Quality_mapper.getReviews");
		return qualityList;
	}

	@Override
	public List<Quality> getCertificates() {
		List<Quality> qualityList = sqlSessionTemplate.selectList("Quality_mapper.getCertificates");
		return qualityList;
	}

}
