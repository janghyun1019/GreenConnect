package com.app.service.post.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.post.PostDAO;
import com.app.dto.image.Image;
import com.app.dto.jjim.Jjim;
import com.app.dto.post.Post;
import com.app.service.post.PostService;

@Service
public class PostServiceImpl implements PostService {
	
	@Autowired
	PostDAO postDAO;

	@Override
	public String getLastPostId() {
		String result = postDAO.getLastPostId();
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
	public int saveThumbnailImage() {
		int result = postDAO.saveThumbnailImage();
		return result;
	}
	
	@Override
	public int modifyPost(Post post) {
		int result = postDAO.modifyPost(post);
		return result;
	}

	@Override
	public int modifyPostImages(Image image) {
		int result = postDAO.modifyPostImages(image);
		return result;
	}
	
	@Override
	public int deletePostImagesByPostId(String postId) {
		int result = postDAO.deletePostImagesByPostId(postId);
		return result;
	}
	
	@Override
	public int deletePostByPostId(String postId) {
		int result = postDAO.deletePostByPostId(postId);
		return result;
	}
	
	@Override
	public int addPostViewsByPostId(String postId) {
		int result = postDAO.addPostViewsByPostId(postId);
		return result;
	}
	
	@Override
	public int savePostJjim(Jjim jjim) {
		int result = postDAO.savePostJjim(jjim);
		return result;
	}
	
	@Override
	public int deletePostJjim(Jjim jjim) {
		int result = postDAO.deletePostJjim(jjim);
		return result;
	}

	@Override
	public Post getPostDetailsByPostId(String postId) {
		Post post = postDAO.getPostDetailsByPostId(postId);
		return post;
	}
	
	@Override
	public Jjim getPostJjim(Jjim jjim) {
		Jjim userJjim = postDAO.getPostJjim(jjim);
		return userJjim;
	}

	@Override
	public List<String> getPostDetailsImageUrlsByPostId(String postId) {
		List<String> imageUrls = postDAO.getPostDetailsImageUrlsByPostId(postId);
		return imageUrls;
	}

	@Override
	public List<Post> getPostList() {
		List<Post> postList = postDAO.getPostList();
		return postList;
	}

	@Override
	public List<Post> getPostListByRelatedData(String relatedData) {
		List<Post> postList = postDAO.getPostListByRelatedData(relatedData);
		return postList;
	}

	@Override
	public String getSellerTelByUserId(Post post) {
		String result = postDAO.getSellerTelByUserId(post);
		return result;
	}

//	@Override
//	public List<Post> getPostsByuserId(String userId) {
//		List<Post> postList = postDAO.getPostsByUserId(userId);
//		return postList;
//	}
//
//	@Override
//	public Post getPostById(int postId) {
//		Post post = postDAO.getPostById(postId);
//		return post;
//	}


}