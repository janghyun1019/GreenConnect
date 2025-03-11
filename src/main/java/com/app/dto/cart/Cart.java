package com.app.dto.cart;

import lombok.Data;

@Data
public class Cart {

	String userId;
	String postId;
	String title;
	int count;
	int price;
	String imageUrl;
}
