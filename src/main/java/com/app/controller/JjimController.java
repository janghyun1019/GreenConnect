package com.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.jjim.JjimVO;
import com.app.service.jjim.JjimService;

@RestController
@RequestMapping("/mypage/Jjim")
public class JjimController {

	@Autowired
	JjimService jjimService;
	
	@GetMapping("/list")
	public ResponseEntity<Map<String,Object>> getJjimList(@RequestParam("userId") String userId) {
	    Map<String,Object> response = new HashMap<>();
	    
	    try {
	        List<JjimVO> jjimList = jjimService.getJjimListByUserId(userId);
	        
	        response.put("success", true);
	        response.put("data", jjimList);
	        return new ResponseEntity<>(response, HttpStatus.OK);
	    } catch(Exception e) {
	        e.printStackTrace(); // 서버 로그에 스택 트레이스 출력
	        
	        response.put("success", false);
	        response.put("message", e.getMessage());
	        response.put("errorType", e.getClass().getName()); // 예외 타입 추가
	        
	        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
    @GetMapping("/check/{postId}")
    public ResponseEntity<Map<String, Object>> checkJjim(
            @PathVariable("postId") String postId,
            @RequestParam("userId") String userId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            boolean isJjim = jjimService.checkJjim(postId, userId);
            
            response.put("success", true);
            response.put("isJjim", isJjim);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/remove/{postId}")
    public ResponseEntity<Map<String, Object>> removeJjim(
            @PathVariable("postId") String postId,
            @RequestParam("userId") String userId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            jjimService.removeJjim(postId, userId);
            
            response.put("success", true);
            response.put("message", "찜 삭제 성공");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
