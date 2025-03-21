package com.app.dao.post.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.post.PostDAO;
import com.app.dto.image.Image;
import com.app.dto.jjim.Jjim;
import com.app.dto.post.Post;

@Repository
public class PostDAOImpl implements PostDAO {


	@Autowired
	SqlSessionTemplate sqlSessionTemplate;

	@Override
	public String getLastPostId() {
		String result = sqlSessionTemplate.selectOne("Post_mapper.getLastPostId");
		return result;
	}

	@Override
	public int savePost(Post post) {
		int result = sqlSessionTemplate.insert("Post_mapper.savePost", post);
		return result;
	}

	@Override
	public int savePostImages(Image image) {
		int result = sqlSessionTemplate.insert("Post_mapper.savePostImages", image);
		return result;
	}
	
	@Override
	public int saveThumbnailImage() {
		int result = sqlSessionTemplate.update("Post_mapper.saveThumbnailImage");
		return result;
	}
	
	@Override
	public int modifyPost(Post post) {
		int result = sqlSessionTemplate.update("Post_mapper.modifyPost", post);
		return result;
	}

	@Override
	public int modifyPostImages(Image image) {
		int result = sqlSessionTemplate.update("Post_mapper.modifyPostImages", image);
		return result;
	}

	@Override
	public int deletePostImagesByPostId(String postId) {
		int result = sqlSessionTemplate.delete("Post_mapper.deletePostImagesByPostId", postId);
		return result;
	}
	
	@Override
	public int deletePostByPostId(String postId) {
		int result = sqlSessionTemplate.update("Post_mapper.deletePostByPostId", postId);
		return result;
	}
	
	@Override
	public int addPostViewsByPostId(String postId) {
		int result = sqlSessionTemplate.update("Post_mapper.addPostViewsByPostId", postId);
		return result;
	}
	
	@Override
	public int savePostJjim(Jjim jjim) {
		int result = sqlSessionTemplate.insert("Post_mapper.savePostJjim", jjim);
		return result;
	}
	
	@Override
	public int deletePostJjim(Jjim jjim) {
		int result = sqlSessionTemplate.delete("Post_mapper.deletePostJjim", jjim);
		return result;
	}

	@Override
	public Post getPostDetailsByPostId(String postId) {
		Post post = sqlSessionTemplate.selectOne("Post_mapper.getPostDetailsByPostId", postId);
		return post;
	}
	
	@Override
	public Jjim getPostJjim(Jjim jjim) {
		Jjim userJjim = sqlSessionTemplate.selectOne("Post_mapper.getPostJjim", jjim);
		return userJjim;
	}

	@Override
	public List<String> getPostDetailsImageUrlsByPostId(String postId) {
		List<String> imageUrls = sqlSessionTemplate.selectList("Post_mapper.getPostDetailsImageUrlsByPostId", postId);
		return imageUrls;
	}

	@Override
	public List<Post> getPostList() {
		List<Post> postList = sqlSessionTemplate.selectList("Post_mapper.getPostList");
		return postList;
	}

	@Override
	public List<Post> getPostListByRelatedData(String relatedData) {
		List<Post> postList = sqlSessionTemplate.selectList("Post_mapper.getPostListByRelatedData", relatedData);
		return postList;
	}

	@Override
    public List<Post> getPostsByUserId(String userId) {
        List<Post> postList = sqlSessionTemplate.selectList("Post_mapper.selectPostsByUserId", userId);
        return postList;
    }

    @Override
    public Post getPostById(int postId) {
        Post post = sqlSessionTemplate.selectOne("Post_mapper.selectPostById", postId);
        return post;
    }

	
}