package com.app.dao.profile;

import com.app.dto.profile.Profile;

public interface ProfileDAO {
	Profile getProfileByUserId(String userId);
	void updateProfileImage(String userId,String fileName);
	void updateNickname(String userId,String nickname);
	void deleteProfileImage(String userId);		
}
