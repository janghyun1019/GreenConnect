package com.app.service.post;

import java.util.List;

import com.app.dto.post.Post;

public interface PostService {

	List<Post> getPostsByuserId(String userId);
	Post getPostById(int postId);
}
