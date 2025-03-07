package com.app.dao.users.impl;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.users.UserDAO;
import com.app.dto.users.Users;
@Repository
public class UserDAOImpl implements UserDAO{

	@Autowired
	SqlSessionTemplate sqlSessionTemplate;
	
	@Override
	public Users getUserInfo(String userId) {
		 return sqlSessionTemplate.selectOne("User_mapper.getUserInfo", userId);
	}

	@Override
	public Users getUserDetail(String userId) {
		 return sqlSessionTemplate.selectOne("User_mapper.getUserDetail", userId);
	}

	@Override
	public int getUserBalance(String userId) {
		 return sqlSessionTemplate.selectOne("User_mapper.getUserBalance", userId);
	}

	@Override
	public void updateUserInfo(Users user) {
		sqlSessionTemplate.update("User_mapper.updateUserInfo", user);
	}


//	@Override
//	public void chargeBalance(String userId, int amount) {
//        Map<String, Object> params = new HashMap<>();
//        params.put("userId", userId);
//        params.put("amount", amount);
//        sqlSessionTemplate.update("User_mapper.chargeBalance", params);
//	}

}
