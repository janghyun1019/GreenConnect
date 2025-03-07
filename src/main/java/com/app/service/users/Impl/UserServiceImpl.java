package com.app.service.users.Impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.users.UserDAO;
import com.app.dto.users.Users;
import com.app.service.users.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	UserDAO userDAO;
	
	@Override
	public Users getUserInfo(String userId) {
		return userDAO.getUserInfo(userId);
	}

	@Override
	public Users getUserDetail(String userId) {
		return userDAO.getUserDetail(userId);
	}

	@Override
	public int getUserBalance(String userId) {
		return userDAO.getUserBalance(userId);
	}

	@Override
	public void updateUserInfo(Users user) {
		userDAO.updateUserInfo(user);
	}

//	@Override
//	public void chargeBalance(String userId, int amount) {
//		  userDAO.chargeBalance(userId, amount);
//	}
	
}
