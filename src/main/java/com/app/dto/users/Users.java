package com.app.dto.users;

import java.util.Date;

import lombok.Data;

@Data
public class Users {
	
	String userId;
    String userName;
    String role;
    String status;
    Date regDate;
    String email;
    String tel;
    String nickName;
    String profileImage;
    String password;
    String userType;
    
    

}