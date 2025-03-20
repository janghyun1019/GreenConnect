package com.app.dao.user;

import java.util.List;
import java.util.Map;

import com.app.dto.user.User;
import com.app.dto.users.Users;


public interface SignupUserDAO {
	Users getUserInfo(String userId);
    Users getUserDetail(String userId);
    List<Users> getUserList();
    List<Map<String, Object>> getUserActivityLog(String userId);
    void updateUserRole(Users user);
    void suspendUser(Users user);
    void deleteUser(String userId);
    void updateUserInfo(Users user);
    
}
