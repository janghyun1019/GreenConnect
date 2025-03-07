package com.app.service.profile.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.profile.ProfileDAO;
import com.app.dto.profile.Profile;
import com.app.service.profile.ProfileService;

@Service
public class ProfileServiceImpl implements ProfileService {
	@Autowired
	ProfileDAO profileDAO;

	@Override
	public Profile getProfileByUserId(String userId) {
		return profileDAO.getProfileByUserId(userId);
	}

	@Override
	public void updateProfileImage(String userId, String fileName) {
		profileDAO.updateProfileImage(userId, fileName);
	}

	@Override
	public void updateNickname(String userId, String nickname) {
		profileDAO.updateNickname(userId, nickname);
	}

	@Override
	public void deleteProfileImage(String userId) {
		profileDAO.deleteProfileImage(userId);
	}
}
