package com.app.dao.review.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.review.ReviewDAO;
import com.app.dto.image.Image;
import com.app.dto.review.Review;

@Repository
public class ReviewDAOImpl implements ReviewDAO {
	
	@Autowired
	SqlSessionTemplate sqlSessionTemplate;

	@Override
	public int savePostReview(Review review) {
		int result = sqlSessionTemplate.insert("review_mapper.savePostReview", review);
		return result;
	}

	@Override
	public int savePostReviewImage(Image image) {
		int result = sqlSessionTemplate.insert("review_mapper.savePostReviewImage", image);
		return result;
	}

	@Override
	public List<Review> getReviewInfoByPostId(String postId) {
		List<Review> result = sqlSessionTemplate.selectList("review_mapper.getReviewInfoByPostId", postId);
		return result;
	}
	
	
	

}
