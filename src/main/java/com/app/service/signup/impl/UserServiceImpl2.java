package com.app.service.signup.impl;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.signup.UserDAO;
import com.app.dto.user.User;
import com.app.service.signup.UserService;

@Service
public class UserServiceImpl2 implements UserService {

	@Autowired
	UserDAO userDAO;

	@Override
	public int registerUser(User user) { // 유저 등록
		
		return userDAO.insertUser(user);
	}

	@Override
	public User getUser(String userId) { 
		return userDAO.getUserById(userId);
	}
	
	public User getUserForJumin(String userJumin) { 
		return userDAO.getUserByJumin(userJumin);
	}

	@Override
	public int modifyUser(User user) {
		return userDAO.updateUser(user);
	}

	@Override
	public int removeUser(String userId) {
		return userDAO.deleteUser(userId);
	}

	@Override
	public List<User> getAllUsers() {
		 List<User> userList = userDAO.getAllUsers();
		    return userList;
	}

	@Override
	public boolean isDuplicatedId(String id) {

		// 아이디 중복체크

		User user = userDAO.getUserById(id);

		if (user == null) { // 객체가 없다 -> 중복X
			return false;
		} else { // 해당 아이디와 동일한 객체가 있다 -> 중복 O
			return true;
		}
	}

	public boolean isDuplicatedNick(String nickName) {

		// 닉네임 중복체크
		User user = userDAO.getUserByNickName(nickName);
		if (user == null) {
			return false;
		} else {
			return true;
		}
	}

	@Override
	public boolean isDuplicatedJumin(String jumin) {
		// 주민등록번호 로 조회 중복체크
		User user = userDAO.getUserByJumin(jumin);

		if (user == null) {
			return false;
		} else {
			return true;
		}
	}

	@Override
	public boolean isDuplicatedTel(String tel) {
		// 전화번호로 조회 중복체크
		User user = userDAO.getUserByTel(tel);

		if (user == null) {
			return false;
		} else {
			return true;
		}
	}

	@Override
	public boolean isDuplicatedEmail(String email) {
		// 이메일로 조회 중복체크
		User user = userDAO.getUserByEmail(email);

		if (user == null) {
			return false;
		} else {
			return true;
		}
	}
	
	@Override
	public boolean isDuplicatedPassword(String password) {
		// 이메일로 조회 중복체크
		User user = userDAO.getUserByEmail(password);

		if (user == null) {
			return false;
		} else {
			return true;
		}
	}

	@Override
	public User getUserForEmail(String userEmail) {
		return userDAO.getUserByEmail(userEmail);
	}

	@Override
	public User getUserById(String userId) {
		
		User user = userDAO.getUserById(userId);
		
		return user;
	}

	@Override
	public List<User> NotifyUserList() {
		List<User> userList = userDAO.NotifyUserList();
		return userList;
	}

	@Override
	public void resetReport(List<String> userIds) {
	    userDAO.resetReport(userIds);
	}

	@Override
	public void updatePassword(String userId, String newPassword) {
		 userDAO.updatePassword(userId, newPassword);
	}

	@Override
	public boolean isDuplicate(String type, String value) {
		
		return userDAO.isDuplicate(type, value) > 0;
	}

}
