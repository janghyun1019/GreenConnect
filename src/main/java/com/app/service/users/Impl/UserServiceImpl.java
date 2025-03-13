package com.app.service.users.Impl;


import java.util.List;
import java.util.Map;

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
    public List<Users> getUserList() {
        return userDAO.getUserList();
    }

    @Override
    public void updateUserRole(Users user) {
        userDAO.updateUserRole(user);
    }

    @Override
    public void suspendUser(String userId, String status) {
        Users user = new Users();
        user.setUserId(userId);
        user.setStatus(status);
        userDAO.suspendUser(user);
    }

    @Override
    public List<Map<String, Object>> getUserActivityLog(String userId) {
        return userDAO.getUserActivityLog(userId);
    }

    @Override
    public Users getUserInfo(String userId) {
        return userDAO.getUserInfo(userId);
    }

    @Override
    public Users getUserDetail(String userId) {
        return userDAO.getUserDetail(userId);
    }
}
