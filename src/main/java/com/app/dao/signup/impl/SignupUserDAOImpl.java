package com.app.dao.signup.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.signup.SignupUserDAO;
import com.app.dto.user.User;

@Repository
public class SignupUserDAOImpl implements SignupUserDAO{

	@Autowired			
	SqlSessionTemplate sqlSessionTemplate;
	
	@Override
	public int insertUser(User user) {
		
		int result = sqlSessionTemplate.insert("User_mapper.insertUser", user);
		
		return result;
	}

	@Override
	public User getUserById(String userId) {
		
		User user = sqlSessionTemplate.selectOne("User_mapper.getUserById", userId); 
		
		return user;
	}

	@Override
	public int updateUser(User user) {
		
		int result = sqlSessionTemplate.update("User_mapper.updateUser",user);

		return result;
	}

	@Override
	public int deleteUser(String userId) {
	
		int result = sqlSessionTemplate.delete("User_mapper.deleteUser",userId);
		return result;
	}

	@Override
	public List<User> getAllUsers() {
	
	List<User> userList = sqlSessionTemplate.selectList("User_mapper.getUserList");
			return userList;
	}

	@Override
	public User getUserByNickName(String nickName) {
		User user = sqlSessionTemplate.selectOne("User_mapper.getUserByNickname", nickName);
		return user;
	}

	@Override
	public User getUserByJumin(String jumin) {
		User user = sqlSessionTemplate.selectOne("User_mapper.getUserByJumin", jumin);
		return user;
	}

	@Override
	public User getUserByTel(String tel) {
		User user = sqlSessionTemplate.selectOne("User_mapper.getUserByTel", tel);
		return user;
	}

	@Override
	public User getUserByEmail(String email) {
		User user = sqlSessionTemplate.selectOne("User_mapper.getUserByEmail", email);
		return user;
	}

	@Override
	public User getUserByPassword(String password) {
		User user = sqlSessionTemplate.selectOne("User_mapper.getUserBypassword", password);
		return user;
	}

	@Override
	public List<User> NotifyUserList() {
		List<User> userList = sqlSessionTemplate.selectList("User_mapper.getNotifyUserList");
		return userList;
	}

	@Override
	public void resetReport(List<String> userIds) {
	    sqlSessionTemplate.update("User_mapper.resetReport", userIds);
	}

	@Override
	public void updatePassword(String userId, String newPassword) {
		Map<String, Object> params = new HashMap<>();
	    params.put("userId", userId);
	    params.put("password", newPassword);

	    sqlSessionTemplate.update("User_mapper.passwordUpdate", params);
		
	}

	@Override
	public int isDuplicate(String type, String value) {
		 Map<String, Object> params = new HashMap<>();
	     params.put("type", type);
	     params.put("value", value);
	     return sqlSessionTemplate.selectOne("User_mapper.isDuplicate", params);
	}
	
	// username으로 사용자 조회 (새 메서드)
    public User getUserByUsername(String username) {
        return sqlSessionTemplate.selectOne("User_mapper.getUserByUsername", username);
    }
	
}
