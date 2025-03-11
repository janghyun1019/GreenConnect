package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.post.Post;
import com.app.service.post.PostService;

@RestController
@RequestMapping("/mypage/post")
public class PostController {

    @Autowired
    PostService postService;
    
    @GetMapping("/user/{userId}")
    public List<Post> getPostByUserId(@PathVariable String userId){
    	
    	return postService.getPostsByuserId(userId);
    }
    @GetMapping("/{postId}")
    public Post getPostById(@PathVariable int postId) {
    	return postService.getPostById(postId);
    }
}
