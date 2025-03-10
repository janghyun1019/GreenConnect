package com.app.service.post;

import java.util.List;

import com.app.dto.image.Image;
import com.app.dto.post.Post;

public interface PostService {
	
	String getLastPostId();
	
	int savePost(Post post);
	
	int savePostImages(Image image);
	
	int saveThumbnailImage();
	
	int modifyPost(Post post);
	
	int modifyPostImages(Image image);
	
	int deletePostImagesByPostId(String postId);
	
	int deletePostByPostId(String postId);
	
	Post getPostDetailsByPostId(String postId);
	
	List<String> getPostDetailsImageUrlsByPostId(String postId);
	
	List<Post> getPostList(); // 리스트에 사용 할 모든 판매글정보 가져오기
	

}
