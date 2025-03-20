package com.app.service.review;

import java.util.List;

import com.app.dto.image.Image;
import com.app.dto.review.Review;

public interface ReviewService {
	
	int savePostReview(Review review);
	
	int savePostReviewImage(Image image);
	
	List<Review> getReviewInfoByPostId(String postId);

}
