package com.app.dto.post;

import java.util.Date;

import lombok.Data;

@Data
public class Post {
	String postId;
	String userId;
	String title;
	String content;
	String postState;
	Date createdAt;
}
