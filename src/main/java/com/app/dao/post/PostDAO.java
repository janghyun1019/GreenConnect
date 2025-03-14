package com.app.dao.post;

import java.util.List;

import com.app.dto.image.Image;
import com.app.dto.jjim.Jjim;
import com.app.dto.post.Post;

public interface PostDAO {
	
	String getLastPostId();
	
	int savePost(Post post);
	
	int savePostImages(Image image);
	
	int saveThumbnailImage();
	
	int modifyPost(Post post);
	
	int modifyPostImages(Image image);
	
	int deletePostImagesByPostId(String postId);
	
	int deletePostByPostId(String postId);
	
	int addPostViewsByPostId(String postId);
	
	int savePostJjim(Jjim jjim);
	
	int deletePostJjim(Jjim jjim);
	
	Post getPostDetailsByPostId(String postId);
	
	Jjim getPostJjim(Jjim jjim);
	
	List<String> getPostDetailsImageUrlsByPostId(String postId);
	
	List<Post> getPostList();

	List<Post> getPostsByUserId(String userId);

	Post getPostById(String postId);
	
	
	
	

}
