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
	private String totalKg;

}
