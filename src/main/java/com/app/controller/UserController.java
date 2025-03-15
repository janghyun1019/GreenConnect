package com.app.controller;

import com.app.dto.user.User;
import com.app.dto.user.CustomUserDetails;
import com.app.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    
    // 중복 아이디 체크 요청 처리
    @RequestMapping("/checkDuplId")
    public Map<String, Object> checkDuplicateId(@RequestParam("userId") String userId) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("type", "user_id");
        paramMap.put("value", userId);
        
        int count = userService.isDuplUser(paramMap);
        Map<String, Object> response = new HashMap<>();
        response.put("isDuplicate", count > 0);

        return response;
    }

    // 회원가입 처리
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        try {
            userService.insertUser(user);
            return ResponseEntity.ok("회원가입 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원가입 실패: " + e.getMessage());
        }
    }

    // 사용자 정보 조회 (userId)
    @SuppressWarnings("rawtypes")
	@GetMapping("/{userId}")
    public ResponseEntity<CustomUserDetails> getUser(@PathVariable String userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            CustomUserDetails userDetails = userService.convertToUserDetails(user);
            return ResponseEntity.ok(userDetails);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // 사용자 정보 수정
    @PutMapping("/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable String userId, @RequestBody User user) {
        user.setUserId(userId);
        try {
            userService.updateUser(user);
            return ResponseEntity.ok("회원정보 수정 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원정보 수정 실패: " + e.getMessage());
        }
    }

    // 사용자 삭제
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable String userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok("회원 삭제 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원 삭제 실패: " + e.getMessage());
        }
    }

    // 이메일로 사용자 조회
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // 중복 체크
    @GetMapping("/checkDuplicate")
    public ResponseEntity<Boolean> isDuplicate(@RequestParam String type, @RequestParam String value) {
        boolean isDup = userService.isDuplicateUser(type, value);
        return ResponseEntity.ok(isDup);
    }

    // 비밀번호 변경
    @PutMapping("/{userId}/password")
    public ResponseEntity<String> updatePassword(@PathVariable String userId, @RequestParam String password) {
        try {
            userService.updatePassword(userId, password);
            return ResponseEntity.ok("비밀번호 변경 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호 변경 실패: " + e.getMessage());
        }
    }
    
    

}
