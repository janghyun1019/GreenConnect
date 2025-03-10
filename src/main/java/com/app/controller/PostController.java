package com.app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.io.File;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@PostMapping("/api/saveWritePost")
	public ResponseEntity<Map<String, Object>> saveWritePost(	@RequestParam("boardId") int boardId,	
									@RequestParam("userId") String userId,
									@RequestParam("nickName") String nickName,
									@RequestParam("productType") String productType,
									@RequestParam("title") String title,
									@RequestParam("content") String content,
									@RequestParam("salesUnit") String salesUnit,
									@RequestParam("price") String price,
									@RequestParam("spot") String spot,
									@RequestParam("cost") String cost,
									@RequestParam("storeId") String storeId,
									@RequestParam(value = "postImages", required = false) MultipartFile[] postImages) {
		System.out.println("게시글유형(1:판매글) : " + boardId);
		
		Map<String, Object> response = new HashMap<>();
		
		try {
		        // 게시글 저장
		        Post post = new Post();
		        post.setBoardId(boardId);
		        post.setUserId(userId);
		        post.setNickName(nickName);
		        post.setPostProductType(productType);
		        post.setPostTitle(title);
		        post.setPostContent(content);
		        post.setPostSalesUnit(salesUnit);
		        post.setPostPrice(price);
		        post.setPostSpot(spot);
		        post.setPostCost(cost);
		        post.setStoreId(storeId);
		        
		        postService.savePost(post); // postId 자동 저장됨
		        String postId = postService.getLastPostId();
		        
		        // 이미지가 있을 경우 저장
		        if (postImages != null && postImages.length > 0) {
		            for (MultipartFile image : postImages) {
		                if (!image.isEmpty()) {
		                    // 파일명 및 경로 설정
		                    String originalFileName = image.getOriginalFilename();
		                    String fileExtension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
		                    String fileName = UUID.randomUUID().toString() + "." + fileExtension; // 유니크한 파일명 생성

		                    // 파일 저장 경로 설정
		                    String filePath = "d:/fileStorage/" + fileName; // 실제 저장 경로
		                    String urlFilePath = "/fileStorage/" + fileName; // URL 접근 경로
		                    
		                    // 파일 저장
		                    image.transferTo(new File(filePath));

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
		                    postService.savePostImages(img);
		                    
		                    // 맨처음 이미지의 url_file_path를 post 테이블의 url_file_path에 저장
		                    postService.saveThumbnailImage();
		                    
		                    //post.setUrlFilePath(urlFilePath);  //이미지 urlfilepath 따온 후 post객체에 저장
		                }
		            }
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
	
	
	@PostMapping("/api/modifyWritePost")
	public ResponseEntity<Map<String, Object>> modifyWritePost(	@RequestParam("boardId") int boardId,
									@RequestParam("postId") String postId,
									@RequestParam("userId") String userId,
									@RequestParam("nickName") String nickName,
									@RequestParam("productType") String productType,
									@RequestParam("title") String title,
									@RequestParam("content") String content,
									@RequestParam("salesUnit") String salesUnit,
									@RequestParam("price") String price,
									@RequestParam("spot") String spot,
									@RequestParam("cost") String cost,
									@RequestParam("storeId") String storeId,
									@RequestParam(value = "postImages", required = false) MultipartFile[] postImages) {
		System.out.println("게시글유형(1:판매글) : " + boardId);
		
		Map<String, Object> response = new HashMap<>();
		
		try {
		        // 게시글 저장
		        Post post = new Post();
		        post.setBoardId(boardId);
		        post.setPostId(postId);
		        post.setUserId(userId);
		        post.setNickName(nickName);
		        post.setPostProductType(productType);
		        post.setPostTitle(title);
		        post.setPostContent(content);
		        post.setPostSalesUnit(salesUnit);
		        post.setPostPrice(price);
		        post.setPostSpot(spot);
		        post.setPostCost(cost);
		        post.setStoreId(storeId);
		        
		        postService.modifyPost(post);
		        
		        // 이미지가 있을 경우 저장
		        if (postImages != null && postImages.length > 0) {
		        	
		        	postService.deletePostImagesByPostId(postId);
		        	
		            for (MultipartFile image : postImages) {
		                if (!image.isEmpty()) {
		                    // 파일명 및 경로 설정
		                    String originalFileName = image.getOriginalFilename();
		                    String fileExtension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
		                    String fileName = UUID.randomUUID().toString() + "." + fileExtension; // 유니크한 파일명 생성

		                    // 파일 저장 경로 설정
		                    String filePath = "d:/fileStorage/" + fileName; // 실제 저장 경로
		                    String urlFilePath = "/fileStorage/" + fileName; // URL 접근 경로
		                    
		                    // 파일 저장
		                    image.transferTo(new File(filePath));

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
		                    postService.savePostImages(img);
		                    
		                    postService.saveThumbnailImage();
		                    
		                    //post.setUrlFilePath(urlFilePath);  //이미지 urlfilepath 따온 후 post객체에 저장
		                }
		            }
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
	
	@Transactional
	@PostMapping("/api/deletePost/{postId}")
	public ResponseEntity<?> deletePostByPostId(@PathVariable String postId){
		try {
            int deletedPost = postService.deletePostByPostId(postId);
            int deletedImages = postService.deletePostImagesByPostId(postId);

            if (deletedPost == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("삭제할 게시글이 없습니다.");
            }

            // 삭제된 이미지가 없어도 게시글이 삭제되었다면 성공
            return ResponseEntity.ok("게시글 삭제 성공");
            
        } catch (Exception e) {
            // 예외 발생 시 롤백 및 에러 응답
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("삭제 중 오류 발생: " + e.getMessage());
        }
	}
	
	
	@GetMapping("/api/posts/{postId}")
    public ResponseEntity<Post> getPostDetailsByPostId(@PathVariable String postId) {
        Post post = postService.getPostDetailsByPostId(postId); // DB에서 데이터 가져오는 로직
        
        return ResponseEntity.ok(post);
    }
	
	
	@GetMapping("/api/posts/images/{postId}")
	public ResponseEntity<List<String>> getPostDetailsImageUrlsByPostId(@PathVariable String postId) {
		List<String> imageUrls = postService.getPostDetailsImageUrlsByPostId(postId);
		
		return ResponseEntity.ok(imageUrls);
	}
	
	@GetMapping("/api/postList")
	public ResponseEntity<List<Post>> getPostList(){
		List<Post> postList = postService.getPostList();
		
		System.out.println("판매글 리스트: " + postList);
		
		 if (postList.isEmpty()) {
	            return ResponseEntity.noContent().build();
	        }
		 
		 return ResponseEntity.ok(postList);
	}
	
	
	
	
	
	
	
}









