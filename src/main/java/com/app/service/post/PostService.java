package com.app.service.post;

import java.util.List;

import com.app.dto.image.Image;
import com.app.dto.post.Post;

public interface PostService {
	
	int getLastPostId();
	
	int savePost(Post post);
	
	int savePostImages(Image image);
	
	Post getPostDetailsByPostId(String postId);
	
	List<String> getPostDetailsImageUrlsByPostId(String postId);

}
