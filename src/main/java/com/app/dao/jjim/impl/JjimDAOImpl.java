package com.app.dao.jjim.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
		Map<String, Object> params = new HashMap<>();
		params.put("postId", postId);
		params.put("userId", userId);
		return sqlSessionTemplate.selectOne("Jjim_mapper.checkJjim",params);
	}

	@Override
	public void removeJjim(String postId, String userId) {
		Map<String, Object> params = new HashMap<>();
		params.put("postId", postId);
		params.put("userId", userId);
		sqlSessionTemplate.delete("Jjim_mapper.removeJjim",params);
	}

}
