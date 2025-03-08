package com.app.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.users.Users;
import com.app.service.users.UserService;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    
    // JWT 토큰에서 사용자 ID를 가져오는 유틸리티 메서드
    private String getUserIdFromToken(HttpServletRequest request) {
        // 헤더에서 토큰 추출
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            // 실제 토큰 처리 로직으로 대체 필요
            return "userId"; // 실제 구현에서는 토큰에서 추출한 사용자 ID 반환
        }
        throw new RuntimeException("인증 정보가 없습니다.");
    }

    @GetMapping("/info")
    public ResponseEntity<Users> getUserInfo(HttpServletRequest request) {
        String userId = getUserIdFromToken(request);
        Users users = userService.getUserInfo(userId);
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/detail")
    public ResponseEntity<Users> getUserDetail(HttpServletRequest request) {
        String userId = getUserIdFromToken(request);
        Users user = userService.getUserDetail(userId);
        return ResponseEntity.ok(user);
    }
    
    @GetMapping("/balance")
    public ResponseEntity<Map<String, Integer>> getUserBalance(HttpServletRequest request) {
        String userId = getUserIdFromToken(request);
        int balance = userService.getUserBalance(userId);
        return ResponseEntity.ok(Map.of("balance", balance));
    }
    
    @PutMapping("/update")
    public ResponseEntity<String> updateUserInfo(HttpServletRequest request, @RequestBody Users user) {
        String userId = getUserIdFromToken(request);
        user.setUserId(userId);
        userService.updateUserInfo(user);
        return ResponseEntity.ok("사용자 정보가 업데이트되었습니다.");
    }
    
    
//    @PostMapping("/charge")
//    public ResponseEntity<String> chargeBalance(HttpServletRequest request, @RequestBody Map<String, Integer> payload) {
//        String userId = getUserIdFromToken(request);
//        Integer amount = payload.get("amount");
//        
//        if (amount == null || amount <= 0) {
//            return ResponseEntity.badRequest().body("유효한 금액을 입력해주세요.");
//        }
//        
//        userService.chargeBalance(userId, amount);
//        return ResponseEntity.ok("잔액이 충전되었습니다.");
//    }
}