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
	
	private String postId;
	private String userId;
	private String nickName; // 판매글 판매자 닉네임으로 표시
	private int boardId;
	private String postProductType;
	private String postTitle;
	private String postContent;
	private String urlFilePath;
	private String postSalesUnit;
	private String postPrice; // 판매가격
	private String postSpot; // 판매자 농장 장소
	private String postCost; // 택배비
	private String storeId;
	private Date postCreateAt; // 판매글 작성 시간
	private int postViews; // 조회수
	
	
	
}
