package com.app.dto.quality;

import lombok.Data;

@Data
public class Quality {
	int evalId;
    String sellerId; // users.user_id 참조
    int score;
    String sellerComment;

    // 리뷰 및 평점 DTO
    int reviewId;
    String postId; // post.post_id 참조
    int rating;
    String reviewContent;

    // 품질 인증서 및 이력 DTO
    int certId;
    String productType; // post.post_product_type 참조
    String issueDate;
}
