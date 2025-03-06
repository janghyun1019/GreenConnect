package com.app.service.post;

import com.app.dto.image.Image;
import com.app.dto.post.Post;

public interface PostService {
	
	int getLastPostId();
	
	int savePost(Post post);
	
	int savePostImages(Image image);

}
