package com.app.service.signup.impl;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.signup.SignupDAO;
import com.app.dto.user.User;
import com.app.service.signup.SignupService;

@Service
public class SignupServiceImpl implements SignupService {

    @Autowired
    SignupDAO signupDAO;

    @Override
    public int registerUser(User user) { // 유저 등록
        return signupDAO.insertUser(user);
    }

    @Override
    public User getUser(String userId) { 
        return signupDAO.getUserById(userId);
    }

    @Override
    public User getUserForJumin(String userJumin) { 
        return signupDAO.getUserByJumin(userJumin);
    }

    @Override
    public int modifyUser(User user) {
        return signupDAO.updateUser(user);
    }

    @Override
    public int removeUser(String userId) {
        return signupDAO.deleteUser(userId);
    }

    @Override
    public List<User> getAllUsers() {
        List<User> userList = signupDAO.getAllUsers();
        return userList;
    }

    @Override
    public boolean isDuplicatedId(String id) {
        // 아이디 중복체크
        User user = signupDAO.getUserById(id);
        return user != null;
    }

    @Override
    public boolean isDuplicatedNick(String nickName) {
        // 닉네임 중복체크
        User user = signupDAO.getUserByNickName(nickName);
        return user != null;
    }

    @Override
    public boolean isDuplicatedJumin(String jumin) {
        // 주민등록번호로 조회 중복체크
        User user = signupDAO.getUserByJumin(jumin);
        return user != null;
    }

    @Override
    public boolean isDuplicatedTel(String tel) {
        // 전화번호로 조회 중복체크
        User user = signupDAO.getUserByTel(tel);
        return user != null;
    }

    @Override
    public boolean isDuplicatedEmail(String email) {
        // 이메일로 조회 중복체크
        User user = signupDAO.getUserByEmail(email);
        return user != null;
    }

    @Override
    public boolean isDuplicatedPassword(String password) {
        // 비밀번호로 조회 중복체크
        User user = signupDAO.getUserByPassword(password);
        return user != null;
    }

    @Override
    public User getUserForEmail(String userEmail) {
        return signupDAO.getUserByEmail(userEmail);
    }

    @Override
    public User getUserById(String userId) {
        return signupDAO.getUserById(userId);
    }

    @Override
    public List<User> NotifyUserList() {
        return signupDAO.NotifyUserList();
    }

    @Override
    public void resetReport(List<String> userIds) {
        signupDAO.resetReport(userIds);
    }

    @Override
    public void updatePassword(String userId, String newPassword) {
        signupDAO.updatePassword(userId, newPassword);
    }

    @Override
    public boolean isDuplicate(String type, String value) {
        return signupDAO.isDuplicate(type, value) > 0;
    }
}
