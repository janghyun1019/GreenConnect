package com.app.dao.signup.impl;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.signup.SnsUserDAO;
import com.app.dto.user.SnsUser;

@Repository
public class SnsUserDAOImpl implements SnsUserDAO{

	@Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public int insertSnsUser(SnsUser snsUser) {
        return sqlSessionTemplate.insert("sns_user_mapper.insertSnsUser", snsUser);
    }

    @Override
    public SnsUser findBySnsId(String snsId) {
        return sqlSessionTemplate.selectOne("sns_user_mapper.findBySnsId", snsId);
    }

}
