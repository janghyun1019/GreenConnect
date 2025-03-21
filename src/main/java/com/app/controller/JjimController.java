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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.jjim.JjimVO;
import com.app.dto.buy.Buy; // Buy DTO 추가
import com.app.service.buy.BuyService; // BuyService 추가
import com.app.service.jjim.JjimService;

@RestController
@RequestMapping("/mypage/Jjim")
public class JjimController {

	@Autowired
	JjimService jjimService;
	
	@Autowired
	BuyService buyService; // BuyService 주입 추가

	@GetMapping("/list")
	public ResponseEntity<Map<String,Object>> getJjimList(@RequestParam("userId") String userId) {
	    Map<String,Object> response = new HashMap<>();
	    try {
	        List<JjimVO> jjimList = jjimService.getJjimListByUserId(userId);
	        response.put("success", true);
	        response.put("data", jjimList);
	        return new ResponseEntity<>(response, HttpStatus.OK);
	    } catch(Exception e) {
	        e.printStackTrace();
	        response.put("success", false);
	        response.put("message", e.getMessage());
	        response.put("errorType", e.getClass().getName());
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

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addJjim(@RequestBody JjimVO jjim) {
        Map<String, Object> response = new HashMap<>();
        try {
            jjimService.addJjim(jjim);
            response.put("success", true);
            response.put("message", "찜 추가 성공");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 새로운 엔드포인트 추가: 구매 내역과 찜 상태 통합
    @PostMapping("/getBuyInfosWithJjim")
    public ResponseEntity<Map<String, Object>> getBuyInfosWithJjim(@RequestBody Buy buy) {
        Map<String, Object> response = new HashMap<>();
        try {
            System.out.println("구매 내역 및 찜 상태 조회 - userId: " + buy.getUserId());
            List<Buy> buyInfos = buyService.getBuyInfosByUserId(buy.getUserId());
            if (buyInfos != null && !buyInfos.isEmpty()) {
                for (Buy buyItem : buyInfos) {
                    boolean isJjim = jjimService.checkJjim(buyItem.getPostId(), buy.getUserId());
                    buyItem.setJjim(isJjim);
                }
                response.put("success", true);
                response.put("data", buyInfos);
                System.out.println("반환된 구매 내역 및 찜 상태: " + buyInfos);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("success", false);
                response.put("message", "구매 내역이 없습니다.");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}