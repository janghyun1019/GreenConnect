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
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.post.Post;
import com.app.service.post.PostService;
import com.app.dto.image.Image;
import com.app.dto.jjim.Jjim;

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
            int deletedPost = postService.deletePostByPostId(postId); // 실제로 delete 시키는게 아니고 판매상태만 N으로 update(데이터정책 상태관리)
            //int deletedImages = postService.deletePostImagesByPostId(postId);

            if (deletedPost == 0) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("notFoundPost");
            }

            // 삭제된 이미지가 없어도 게시글이 삭제되었다면 성공
            return ResponseEntity.ok("deletePostOk");
            
        } catch (Exception e) {
            // 예외 발생 시 롤백 및 에러 응답
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("삭제 중 오류 발생: " + e.getMessage());
        }
	}
	
	
	@PostMapping("/api/getPostJjim")
	public ResponseEntity<Jjim> getPostJjim(@RequestBody Jjim jjim) {
		if(jjim != null) {
			Jjim userJjim = postService.getPostJjim(jjim);
			System.out.println("찜 데이터: "+ userJjim);
			return ResponseEntity.ok(userJjim);
		}
		return ResponseEntity.ok(null);
	}
	
	
	@PostMapping("/api/savePostJjim")
	public ResponseEntity<?> updatePostJjimByPostId(@RequestBody Jjim jjim) {
		try {
			System.out.println(jjim);
			System.out.println(jjim.getUserId());
			System.out.println(jjim.getPostId());

			int result = postService.savePostJjim(jjim);

			if (result > 0) {
				System.out.println("찜성공: " + jjim.getUserId() + " 가 " + jjim.getPostId() + "번 게시글을 찜함");
				return ResponseEntity.ok("jjimOk");
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("jjimFail");
			}
		} catch (DataIntegrityViolationException e) {
			System.out.println("이미 찜한 게시글에 접근함!!");
			return ResponseEntity.status(HttpStatus.CONFLICT).body("alreadyJjimed");
		} catch (Exception e) { 
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("severError");
		}
	}
	
	@PostMapping("/api/deletePostJjim")
	public ResponseEntity<?> deletePostJjim(@RequestBody Jjim jjim) { // jjim 에는 userId,postId 들어있음
		
		int result = postService.deletePostJjim(jjim);
		if (result > 0) {
			System.out.println("찜취소: " + jjim.getUserId() + " 가 " + jjim.getPostId() + "번 게시글을 찜 취소함");
            return ResponseEntity.ok("jjimDeleteOk");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("jjimDeleteFail");
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
	
	@PostMapping("/api/addPostViews/{postId}")
	public ResponseEntity<String> addPostViews(@PathVariable String postId){
		
		int addPostViews = postService.addPostViewsByPostId(postId);
		try {
			if(addPostViews > 0) {
				return ResponseEntity.ok("viewsUpdateOk");
			} else {
				return ResponseEntity.status(404).body("notFoundViews");
			}
        } catch (Exception e) {
            return ResponseEntity.status(500).body("updateViewsFail");
        }
	}
	
//	@GetMapping("/mypage/post/user/{userId}")
//	public List<Post> getPostByUserId(@PathVariable String userId){
//		
//		return postService.getPostsByuserId(userId);
//	}
//
//	@GetMapping("/mypage/post/{postId}")
//	public Post getPostById(@PathVariable int postId) {
//		return postService.getPostById(postId);
//	}
	

}