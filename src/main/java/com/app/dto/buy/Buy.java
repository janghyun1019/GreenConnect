package com.app.dto.buy;

import lombok.Data;

@Data
public class Buy {
	
	private String userId;
	private String nickName;
	private int boardId;
	private String postId;
	private String buyCount;
	private String totalPrice;
	private String totalGram;
	
	// postId로 조인해서 가져온 post테이블 정보 담는 변수
	private String postUserId;
	private String postNickName;
	private String postTitle;
	private String urlFilePath;
	private String postPrice;
	private String postCost;

}
