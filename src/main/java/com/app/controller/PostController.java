package com.app.controller;

import java.io.File;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.post.Post;
import com.app.service.post.PostService;
import com.app.dto.image.Image;

@Controller
public class PostController {
	
	@Autowired
	PostService postService;
	
	@PostMapping("/saveWritePost")
	public String saveWriteReview(	@RequestParam("boardId") int boardId,	
									@RequestParam("userId") String userId,
									@RequestParam("nickName") String nickName,
									@RequestParam("title") String title,
									@RequestParam("content") String content,
									@RequestParam("price") String price,
									@RequestParam("spot") String spot,
									@RequestParam("cost") String cost,
									@RequestParam("storeId") String storeId,
									@RequestParam(value = "postImages", required = false) MultipartFile postImages) {
		System.out.println("게시글유형(1:판매글) : " + boardId);
		try {
		        // 게시글 저장
		        Post post = new Post();
		        post.setBoardId(boardId);
		        post.setUserId(userId);
		        post.setNickName(nickName);
		        post.setPostTitle(title);
		        post.setPostContent(content);
		        post.setPostPrice(price);
		        post.setPostSpot(spot);
		        post.setPostCost(cost);
		        post.setStoreId(storeId);
		        
		        postService.savePost(post); // postId 자동 저장됨
		        int postId = postService.getLastPostId();
		        
		        // 이미지가 있을 경우 저장
		        if (postImages != null && !postImages.isEmpty()) {
		            // 파일명, 경로 등을 직접 처리
		            String originalFileName = postImages.getOriginalFilename();
		            String fileExtension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
		            String fileName = UUID.randomUUID().toString() + "." + fileExtension; // 파일명 생성

		            // 파일 저장 경로 설정
		            String filePath = "d:/fileStorage/" + fileName; // 서버 저장 경로
		            String urlFilePath = "/fileStorage/" + fileName; // URL 경로

		            // 파일 저장
		            postImages.transferTo(new File(filePath)); // 실제 파일 저장

		            // Images 객체 생성하여 이미지 정보 설정
		            Image images = new Image();
		            images.setPostId(postId); // 게시글 ID 설정
		            images.setFileName(fileName);       // 저장된 파일명
		            images.setOriginalFileName(originalFileName); // 원본 파일명
		            images.setFilePath(filePath);       // 파일 저장 경로
		            images.setUrlFilePath(urlFilePath); // URL 경로
		            images.setFileExtension(fileExtension); // 파일 확장자
		            images.setUploadedAt(new Date());    // 업로드 시간 설정

		            // 이미지 정보 DB 저장
		            postService.savePostImages(images); // images 테이블에 저장
		            
		            post.setUrlFilePath(urlFilePath);  //이미지 urlfilepath 따온 후 post객체에 저장
		        }
		    } catch (Exception e) {
		        e.printStackTrace();
		    }

	    return "redirect:/reviewBoard?boardId=1";
	}

}
