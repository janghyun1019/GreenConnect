package com.app.dao.image.impl;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.image.ImageDAO;
import com.app.dto.image.Image;

@Repository
public class ImageDAOImpl implements ImageDAO {
	
	@Autowired
	SqlSessionTemplate sqlSessionTemplate;

	@Override
	public int savePostImage(Image image) {
		int result = sqlSessionTemplate.insert("post_mapper.savePostImage", image);
		
		return result;
	}

}
