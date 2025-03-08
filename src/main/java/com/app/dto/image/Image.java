package com.app.dto.image;

import java.util.Date;

import lombok.Data;

@Data
public class Image {
	
	private int imageId;
	private String postId;
	private String fileName; // 변환된 파일이름.jpg
	private String originalFileName; // 원본파일이름
	private String filePath;	// 파일경로 (d:/fileStorage/asdasd.jpg)
	private String urlFilePath;	// url 파일 경로 (/fileStorage/asdasd.jpg)
	private String fileExtension; // 확장자명 (jpg,jpeg ..)
	private Date uploadedAt; // 이미지업로드 시간

}
