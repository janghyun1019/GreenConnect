package com.app.mapper;

import java.util.Map;

import com.app.dto.user.User;

public interface SignupMapper {
    int registerUser(User user);
    User getUser(String userId);
    int isDuplicatedId(String userId);
    int isDuplicatedNick(String nickName);
    int isDuplicatedTel(String tel);
    int isDuplicatedEmail(String email);
    User getUserForEmail(String email);
    void updatePassword(Map<String, String> params);
}