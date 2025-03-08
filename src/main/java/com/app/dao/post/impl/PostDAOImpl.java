package com.app.dao.post.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.post.PostDAO;
import com.app.dto.image.Image;
import com.app.dto.post.Post;

@Repository
public class PostDAOImpl implements PostDAO {

	@Autowired
	SqlSessionTemplate sqlSessionTemplate;

	@Override
	public int getLastPostId() {
		int result = sqlSessionTemplate.selectOne("post_mapper.getLastPostId");
		
		return result;
	}

	@Override
	public int savePost(Post post) {
		int result = sqlSessionTemplate.insert("post_mapper.savePost", post);
		
		return result;
	}

	@Override
	public int savePostImages(Image image) {
		int result = sqlSessionTemplate.insert("post_mapper.savePostImages", image);
		return result;
	}

	@Override
	public Post getPostDetailsByPostId(String postId) {
		Post post = sqlSessionTemplate.selectOne("post_mapper.getPostDetailsByPostId", postId);
		return post;
	}

	@Override
	public List<String> getPostDetailsImageUrlsByPostId(String postId) {
		List<String> imageUrls = sqlSessionTemplate.selectList("post_mapper.getPostDetailsImageUrlsByPostId", postId);
		return imageUrls;
	}
	
	
	
}
