package com.app.dto.ratings;

import lombok.Data;

@Data
public class Ratings { //후기

	private String ratingId;
    private String postId;
    private String userId;
    private int userRating;
    private String userImages;
    private String userReview;
	
}
