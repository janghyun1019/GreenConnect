package com.app.service.jjim.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.jjim.JjimDAO;
import com.app.dto.jjim.JjimVO;
import com.app.service.jjim.JjimService;

@Service
public class JjimServiceImpl implements JjimService{

	@Autowired
	JjimDAO jjimDAO;
	
	@Override
	public List<JjimVO> getJjimListByUserId(String userId) {
		List<JjimVO> jjimList = jjimDAO.getJjimListByUserId(userId);
		System.out.println("찜 목록 조회: userId = " + userId);
		return jjimList;
	}

	@Override
	public boolean checkJjim(String postId, String userId) {
		return jjimDAO.checkJjim(postId, userId);
	}

	@Override
	public void removeJjim(String postId, String userId) {
		jjimDAO.removeJjim(postId, userId);
		
	}

}
