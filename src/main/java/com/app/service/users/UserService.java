package com.app.service.users;

import com.app.dto.users.Users;

public interface UserService {

	Users getUserInfo(String userId);
	Users getUserDetail(String userId);
	int getUserBalance(String userId);
	void updateUserInfo(Users user);
//    void chargeBalance(String userId, int amount);
}
