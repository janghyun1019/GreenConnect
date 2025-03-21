package com.app.dto.user;

import lombok.Data;

@Data
public class User {
<<<<<<< HEAD
	
	private String userId;
	private String userName;
	private String nickName;
	private String password;
	private String email;
	private String tel;
	private String jumin;
	private String userType;
=======

	String userId;
	String userName;
	String nickName;
	String password;
	String email;
	String tel;
	String jumin;
	String userType;
	
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getJumin() {
		return jumin;
	}
	public void setJumin(String jumin) {
		this.jumin = jumin;
	}
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	
	
>>>>>>> 5d05381daba2bfbbffc5fdd75f0c3bc97b69a537
	
}
