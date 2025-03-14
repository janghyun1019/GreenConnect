package com.app.dao.users.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.app.dao.users.UserDAO;
import com.app.dto.users.Users;

@Repository
public class UserDAOImpl implements UserDAO {

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
    public List<Users> getUserList() {
        return sqlSessionTemplate.selectList("User_mapper.getUserList");
    }

    @Override
    public List<Map<String, Object>> getUserActivityLog(String userId) {
        return sqlSessionTemplate.selectList("User_mapper.getUserActivityLog", userId);
    }

    @Override
    public void updateUserRole(Users user) {
        sqlSessionTemplate.update("User_mapper.updateUserRole", user);
    }

    @Override
    public void suspendUser(Users user) {
        sqlSessionTemplate.update("User_mapper.suspendUser", user);
    }
}