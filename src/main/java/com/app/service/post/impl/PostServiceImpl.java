package com.app.service.post.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.post.PostDAO;
import com.app.dto.image.Image;
import com.app.dto.post.Post;
import com.app.service.post.PostService;

@Service
public class PostServiceImpl implements PostService {
	
	@Autowired
	PostDAO postDAO;

	@Override
	public int getLastPostId() {
		int result = postDAO.getLastPostId();
		return result;
	}

	@Override
	public int savePost(Post post) {
		int result = postDAO.savePost(post);
		return result;
	}

	@Override
	public int savePostImages(Image image) {
		int result = postDAO.savePostImages(image);
		return result;
	}

	@Override
	public Post getPostDetailsByPostId(String postId) {
		Post post = postDAO.getPostDetailsByPostId(postId);
		return post;
	}

	@Override
	public List<String> getPostDetailsImageUrlsByPostId(String postId) {
		List<String> imageUrls = postDAO.getPostDetailsImageUrlsByPostId(postId);
		return imageUrls;
	}
	
	

}
