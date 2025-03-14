package com.app.dao.profile.Impl;

import java.util.HashMap;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.profile.ProfileDAO;
import com.app.dto.profile.Profile;

@Repository
public class ProfileDAOImpl implements ProfileDAO{

	@Autowired
	SqlSessionTemplate sqlSessionTemplate;
	
	@Override
	public Profile getProfileByUserId(String userId) {
		return sqlSessionTemplate.selectOne("Profile_Mapper.getProfileByUserId",userId);
	}

	@Override
	public void updateProfileImage(String userId, String fileName) {
		Map<String,Object> params = new HashMap<>();
		params.put("userId",userId);
		params.put("fileName", fileName);
		sqlSessionTemplate.update("Profile_Mapper.updateProfileImage", params);
	}

	@Override
	public void updateNickname(String userId, String nickname) {
		Map<String,Object> params = new HashMap<>();
		params.put("userId",userId);
		params.put("nickname", nickname);
		sqlSessionTemplate.update("Profile_Mapper.updateNickname", params);
	}

	@Override
	public void deleteProfileImage(String userId) {
		Map<String, Object> params = new HashMap<>();
        params.put("userId", userId);
        sqlSessionTemplate.update("Profile_Mapper.deleteProfileImage", params);
	}

}
