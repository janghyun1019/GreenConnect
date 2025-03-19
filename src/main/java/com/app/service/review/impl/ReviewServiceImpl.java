package com.app.service.review.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.review.ReviewDAO;
import com.app.dto.image.Image;
import com.app.dto.review.Review;
import com.app.service.review.ReviewService;


@Service
public class ReviewServiceImpl implements ReviewService {
	
	@Autowired
	ReviewDAO reviewDAO;

	@Override
	public int savePostReview(Review review) {
		int result = reviewDAO.savePostReview(review);
		return result;
	}

	@Override
	public int savePostReviewImage(Image image) {
		int result = reviewDAO.savePostReviewImage(image);
		return result;
	}

	@Override
	public List<Review> getReviewInfoByPostId(String postId) {
		List<Review> result = reviewDAO.getReviewInfoByPostId(postId);
		return result;
	}

}
