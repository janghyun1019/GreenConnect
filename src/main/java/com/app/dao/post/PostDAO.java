package com.app.dao.post;

import com.app.dto.image.Image;
import com.app.dto.post.Post;

public interface PostDAO {
	
	int getLastPostId();
	
	int savePost(Post post);
	
	int savePostImages(Image image);

}
