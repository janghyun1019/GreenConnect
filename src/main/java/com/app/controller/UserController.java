package com.app.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("/user/info")
    public ResponseEntity<Users> getUserInfo(HttpServletRequest request) {
        String userId = getUserIdFromToken(request);
        Users users = userService.getUserInfo(userId);
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/user/detail")
    public ResponseEntity<Users> getUserDetail(HttpServletRequest request) {
        String userId = getUserIdFromToken(request);
        Users user = userService.getUserDetail(userId);
        return ResponseEntity.ok(user);
    }
    
    @PutMapping("/user/update")
    public ResponseEntity<String> updateUserInfo(HttpServletRequest request, @RequestBody Users user) {
        String userId = getUserIdFromToken(request);
        user.setUserId(userId);
        userService.updateUserRole(user);
        return ResponseEntity.ok("사용자 정보가 업데이트되었습니다.");
    }
 // 사용자 목록 조회
    @GetMapping("/admin/users")
    public List<Users> getUserList() {
    	List<Users> users = userService.getUserList();
    	System.out.println(users);
        return users;
    }

    // 사용자 권한 수정
    @PostMapping("/admin/users/role")
    public void updateUserRole(@RequestBody Users user) {
        userService.updateUserRole(user);
    }

    // 사용자 계정 정지
    @PostMapping("/admin/users/suspend")
    public void suspendUser(@RequestParam("userId") String userId, @RequestParam("status") String status) {
        if ("active".equals(status) || "suspended".equals(status)) {
            userService.suspendUser(userId, status);
        } else {
            throw new IllegalArgumentException("Invalid status: " + status);
        }
    }

    // 사용자 활동 로그 조회
    @GetMapping("/admin/users/activity")
    public List<Map<String, Object>> getUserActivityLog(@RequestParam("userId") String userId) {
        return userService.getUserActivityLog(userId);
    }
    
}