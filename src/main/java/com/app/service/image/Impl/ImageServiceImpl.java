package com.app.service.image.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.image.ImageDAO;
import com.app.dto.image.Image;
import com.app.service.image.ImageService;

@Service
public class ImageServiceImpl implements ImageService{

	@Autowired
	ImageDAO imageDAO;

	@Override
	public int savePostImage(Image image) {
		int result = imageDAO.savePostImage(image);
		
		return result;
	}
	
	
	
}
