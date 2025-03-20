package com.app.dto.review;

import lombok.Data;

@Data
public class Review {
	
	private String userId;
	private String userNickName;
	private String postId; // 판매글아이디
	private int rating; // 별점
	private String reviewContent; //후기내용
	private String urlFilePath; // 후기이미지

}
