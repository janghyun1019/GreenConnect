package com.app.dao.user.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.user.SignupUserDAO;
import com.app.dto.user.User;
import com.app.dto.users.Users;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Repository
public class UserDAOImpl implements SignupUserDAO {

    private static final Logger logger = LogManager.getLogger(UserDAOImpl.class);

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public Users getUserInfo(String userId) {
        try {
            return sqlSessionTemplate.selectOne("User_mapper.getUserInfo", userId);
        } catch (Exception e) {
            logger.error("Error fetching user info: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public Users getUserDetail(String userId) {
        try {
            return sqlSessionTemplate.selectOne("User_mapper.getUserDetail", userId);
        } catch (Exception e) {
            logger.error("Error fetching user detail: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public List<Users> getUserList() {
        try {
            return sqlSessionTemplate.selectList("User_mapper.getUserList");
        } catch (Exception e) {
            logger.error("Error fetching user list: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public List<Map<String, Object>> getUserActivityLog(String userId) {
        try {
            return sqlSessionTemplate.selectList("User_mapper.getUserActivityLog", userId);
        } catch (Exception e) {
            logger.error("Error fetching activity log: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public void updateUserRole(Users user) {
        try {
            sqlSessionTemplate.update("User_mapper.updateUserRole", user);
        } catch (Exception e) {
            logger.error("Error updating user role: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public void suspendUser(Users user) {
        try {
            sqlSessionTemplate.update("User_mapper.suspendUser", user);
        } catch (Exception e) {
            logger.error("Error suspending user: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public void deleteUser(String userId) {
        try {
            sqlSessionTemplate.delete("User_mapper.deleteUser", userId);
        } catch (Exception e) {
            logger.error("Error deleting user: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public void updateUserInfo(Users user) {
        try {
            sqlSessionTemplate.update("User_mapper.updateUserInfo", user);
        } catch (Exception e) {
            logger.error("Error updating user info: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }
}