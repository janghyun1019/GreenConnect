package com.app.dao.post.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.post.PostDAO;
import com.app.dto.post.Post;

@Repository
public class PostDAOImpl implements PostDAO{

	@Autowired
	SqlSessionTemplate sqlSessionTemplate;
	
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
