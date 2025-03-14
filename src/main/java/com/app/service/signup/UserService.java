package com.app.service.signup;

import java.util.List;

import javax.servlet.http.HttpSession;

import com.app.dto.user.User;


public interface UserService {

	int registerUser(User user);
    User getUser(String userId);
    User getUserById(String userId);
    User getUserForJumin(String userJumin);
    User getUserForEmain(String userEmail);
    int modifyUser(User user);
    int removeUser(String userId);
    List<User> getAllUsers();
    List<User> NotifyUserList();
    void resetReport(List<String> userIds);
    boolean isDuplicatedId(String id);
	boolean isDuplicatedNick(String nickName);
	boolean isDuplicatedJumin(String jumin);
	boolean isDuplicatedTel(String tel);
	boolean isDuplicatedEmail(String email);
	boolean isDuplicatedPassword(String password);
	void updatePassword(String userId, String newPassword);
	
	//로그인을 위해 새로은 기능 추가 
}
