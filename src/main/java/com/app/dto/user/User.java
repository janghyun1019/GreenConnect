package com.app.dto.user;

import java.sql.Timestamp;
import lombok.Data;

@Data
public class User {
    private String userId;          // 사용자 아이디
    private String password;        // 비밀번호
    private String userName;        // 이름
    private String nickName;        // 닉네임
    private String profileImage;    // 프로필 이미지 URL 또는 경로
    private String email;           // 이메일
    private String tel;             // 전화번호
    private String role = "buyer";  // 역할 (기본값: buyer)
    private String status = "active"; // 상태 (기본값: active)
    private String userType = "CUS";  // 사용자 유형 (기본값: CUS)
    private Timestamp signup;         // 가입일자
    private Timestamp terms;          // 약관 동의 일자
    
	public void setUserType(String string) {
		// TODO Auto-generated method stub
		
	}

	public void setUserId(String userId2) {
		// TODO Auto-generated method stub
		
	}

	public Object getUserId() {
		// TODO Auto-generated method stub
		return null;
	}

	public String getPassword() {
		// TODO Auto-generated method stub
		return null;
	}

	public void setPassword(String encPw) {
		// TODO Auto-generated method stub
		
	}

	public Object getNickName() {
		// TODO Auto-generated method stub
		return null;
	}

	public Object getUserName() {
		// TODO Auto-generated method stub
		return null;
	}

	public Object getTel() {
		// TODO Auto-generated method stub
		return null;
	}
}
