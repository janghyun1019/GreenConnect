package com.app.dto.follow;

import lombok.Data;

@Data
public class Follow {
	
	private Long followNumber;
    private String followUserId; //팔로우당한사람
    private String followerUserId; //팔로우한사람

}
