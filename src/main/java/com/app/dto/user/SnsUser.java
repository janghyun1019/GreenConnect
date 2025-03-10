package com.app.dto.user;

import lombok.Data;

@Data
public class SnsUser {

	String userId;
	String snsId;
	String snsNickName;
	String snsEmail;
	String snsAccessToken;
	String snsRefreshToken;
	String snsUserType;
	
}
