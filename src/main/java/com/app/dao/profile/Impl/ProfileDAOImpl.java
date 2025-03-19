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
		return sqlSessionTemplate.selectOne("Profile_mapper.getProfileByUserId",userId);
	}

	@Override
    public void updateProfileImage(String userId, String fileName) {
        // 매개변수 전달을 위해 DTO 또는 Map 사용
        Profile params = new Profile();
        params.setUserId(userId);
        params.setProfileImage(fileName);
        sqlSessionTemplate.update("Profile_mapper.updateProfileImage", params);
    }

	@Override
	public void updateNickname(String userId, String nickname) {
		Map<String,Object> params = new HashMap<>();
		params.put("userId",userId);
		params.put("nickname", nickname);
		sqlSessionTemplate.update("Profile_mapper.updateNickname", params);
	}

	@Override
	public void deleteProfileImage(String userId) {
		Map<String, Object> params = new HashMap<>();
        params.put("userId", userId);
        sqlSessionTemplate.update("Profile_mapper.deleteProfileImage", params);
	}

}
