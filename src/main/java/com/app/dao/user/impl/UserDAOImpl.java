package com.app.dao.user.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.user.UserDAO;
import com.app.dto.user.User;

@Repository
public class UserDAOImpl implements UserDAO {

    private final String namespace = "mapper.signup.signup_mapper";

    @Autowired
    private SqlSession sqlSession;

    @Override
    public int saveUser(User user) {
        return sqlSession.insert(namespace + ".insertUser", user);
    }

    @Override
    public List<User> findUserList() {
        return sqlSession.selectList(namespace + ".getAllUsers");
    }

    @Override
    public User findUserById(String userId) {
        return sqlSession.selectOne(namespace + ".getUserById", userId);
    }

    @Override
    public User checkUserLogin(User user) {
        return sqlSession.selectOne(namespace + ".checkUserLogin", user);
        // login용 메서드는 signup_mapper.xml에 추가 필요
    }

    @Override
    public int modifyUser(User user) {
        return sqlSession.update(namespace + ".updateUser", user);
    }

    @Override
    public List<User> findUserListBySearchCondition(Map<String, Object> paramMap) {
        return sqlSession.selectList(namespace + ".findUserListBySearchCondition", paramMap);
        // 조건 검색 메서드는 signup_mapper.xml에 추가 필요
    }

    @Override
    public int saveUserProfileImage(Map<String, Object> paramMap) {
        return sqlSession.update(namespace + ".saveUserProfileImage", paramMap);
        // 프로필 이미지 저장 메서드는 signup_mapper.xml에 추가 필요
    }

    @Override
    public String findUserProfileImageById(String userId) {
        return sqlSession.selectOne(namespace + ".findUserProfileImageById", userId);
        // 프로필 이미지 조회 메서드는 signup_mapper.xml에 추가 필요
    }

    @Override
    public int deleteUser(String userId) {
        return sqlSession.delete(namespace + ".deleteUser", userId);
    }

    @Override
    public int updateUserPassword(Map<String, Object> paramMap) {
        return sqlSession.update(namespace + ".passwordUpdate", paramMap);
    }

    @Override
    public int isDuplUser(Map<String, Object> paramMap) {
        return sqlSession.selectOne(namespace + ".isDuplUser", paramMap);
    }
}
