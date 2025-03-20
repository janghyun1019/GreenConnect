package com.app.service.user;

import java.util.List;
import java.util.Map;

import com.app.dto.users.Users;

public interface UserService {
	List<Users> getUserList();        
    void updateUserRole(Users user);    
    void suspendUser(String userId, String status);  
    List<Map<String, Object>> getUserActivityLog(String userId);
    Users getUserInfo(String userId);  
    Users getUserDetail(String userId); 
    void deleteUser(String userId);
    void updateUserInfo(Users user);
}
