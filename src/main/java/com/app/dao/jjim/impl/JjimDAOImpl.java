package com.app.dao.jjim.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.jjim.JjimDAO;
import com.app.dto.jjim.JjimVO;
@Repository
public class JjimDAOImpl implements JjimDAO{

	@Autowired
	SqlSessionTemplate sqlSessionTemplate;
	
	@Override
	public List<JjimVO> getJjimListByUserId(String userId) {
		List<JjimVO> jjimList = sqlSessionTemplate.selectList("Jjim_mapper.getJjimListByUserId",userId);
		return jjimList;
	}

	@Override
	public boolean checkJjim(String postId, String userId) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void removeJjim(String postId, String userId) {
		// TODO Auto-generated method stub
		
	}

}
