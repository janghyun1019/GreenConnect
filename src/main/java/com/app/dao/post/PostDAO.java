package com.app.dao.post;

import java.util.List;

import com.app.dto.post.Post;

public interface PostDAO {
    List<Post> getPostsByUserId(String userId); 
    Post getPostById(int postId); 
}
