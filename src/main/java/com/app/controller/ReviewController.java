package com.app.controller;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.image.Image;
import com.app.dto.review.Review;
import com.app.service.review.ReviewService;

@Controller
public class ReviewController {

	@Autowired
	ReviewService reviewService;
	
	@PostMapping("/api/writePostReview")
	public ResponseEntity<Map<String, Object>> savePostReview(@RequestParam("userId") String userId,
																@RequestParam("postId") String postId,
																@RequestParam("userNickName") String userNickName,
																@RequestParam("rating") int rating,
																@RequestParam("reviewContent") String reviewContent,
																@RequestParam(value = "reviewImage", required = false) MultipartFile reviewImage){
		
		Map<String, Object> response = new HashMap<>();
		
		try {
			
			Review review = new Review();
			review.setPostId(postId);
			review.setUserId(userId);
			review.setUserNickName(userNickName);
			review.setRating(rating);
			review.setReviewContent(reviewContent);
			
			String urlFilePath = null;
			
			// 이미지가 있을 경우 저장
	        if (reviewImage != null) {
	            
                if (!reviewImage.isEmpty()) {
                    // 파일명 및 경로 설정
                    String originalFileName = reviewImage.getOriginalFilename();
                    String fileExtension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
                    String fileName = UUID.randomUUID().toString() + "." + fileExtension; // 유니크한 파일명 생성

                    // 파일 저장 경로 설정
                    String filePath = "d:/fileStorage/" + fileName; // 실제 저장 경로
                    urlFilePath = "/fileStorage/" + fileName; // URL 접근 경로
                    
                    // 파일 저장
                    reviewImage.transferTo(new File(filePath));

                    // Images 객체 생성 및 저장
                    Image img = new Image();
                    img.setPostId(postId); // 게시글 ID 연결
                    img.setFileName(fileName);
                    img.setOriginalFileName(originalFileName);
                    img.setFilePath(filePath);
                    img.setUrlFilePath(urlFilePath);
                    img.setFileExtension(fileExtension);
                    img.setUploadedAt(new Date());

                    // 이미지 정보 DB 저장
                    reviewService.savePostReviewImage(img);
                    
                }
	            
	        }
	        // review 객체에 이미지 URL 추가
	        if (urlFilePath != null) {
	            review.setUrlFilePath(urlFilePath);
	        }
	        
	        int result = reviewService.savePostReview(review);
	        if (result > 0) {
	            System.out.println("후기글 저장완료");
	        }
	        
	        response.put("status", "success");
	        response.put("message", "게시글이 성공적으로 저장되었습니다.");
	        response.put("postId", postId);
	        return ResponseEntity.ok(response);
	        
	    } catch (Exception e) {

	    	e.printStackTrace();
	        response.put("status", "error");
	        response.put("message", "게시글 저장 중 오류 발생");
	        return ResponseEntity.status(500).body(response);
	    	
	    }
		
	}
	
	
	@PostMapping("/api/getReviewInfo/{postId}")
	public ResponseEntity<?> getReviewInfoByPostId(@PathVariable String postId){
		
		System.out.println("포스트아이디: " + postId);
		
		List<Review> review = reviewService.getReviewInfoByPostId(postId);
		
		System.out.println("후기 리스트: " + review);
		
		if (review.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		
		return ResponseEntity.ok(review);
	}
	
}
