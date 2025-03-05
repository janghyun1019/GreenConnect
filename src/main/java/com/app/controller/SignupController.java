package com.app.controller;

import java.security.NoSuchAlgorithmException;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.user.User;
import com.app.service.signup.MailService;
import com.app.service.signup.UserService;
import com.app.utill.JwtProvider;
import com.app.utill.SHA256Encryptor;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class SignupController {

	@Autowired
	UserService userService;
	
	 @Autowired
	 private MailService emailService; // 이메일 전송 서비스

	@PostMapping("/user/signup")
	public String signupAction(@RequestBody User user) {

		if (user.getUserId() == null || user.getUserId().trim().isEmpty()) {
			return "fail"; // userId가 없으면 회원가입 실패
		}
		
		try {
			// 유저 비밀번호 암호화
			 String encPw = SHA256Encryptor.encrypt(user.getPassword());
			 user.setPassword(encPw);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		
		user.setUserType("CUS");

		int result = userService.registerUser(user);

		System.out.println("회원가입 처리 결과 " + result);

		if (result > 0) {
			return "ok";
		} else {
			return "fail";
		}
	}

	// 로그인 시 API 발급 (JWT 방식)
	@PostMapping("/user/login")
	public String login(@RequestBody Map<String, String> loginInfo, User user) {

		try {
			// 유저 비밀번호 암호화
			 String encPw = SHA256Encryptor.encrypt(loginInfo.get("password"));
			 user.setPassword(encPw);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		
		String userId = loginInfo.get("userId");
		String userPw = user.getPassword();
		
		System.out.println(userId); // 검증용 유저 아이디
		System.out.println(userPw); // 검증용 유저 암호화 비밀번호
		
		
		//유저 정보 조회 
		user = userService.getUser(userId);

		if (user == null) { // 유저가 존재 하지 않을 경우
			return  "{\"message\":\"아이디가 존재하지 않습니다.\"}"; // JSON 형태로 반환
		}

		
		if (!userPw.equals(user.getPassword())) { // 매개변수 입력된 유저 비밀번호와 비교
			return "{\"message\":\"비밀번호가 틀렸습니다.\"}"; // JSON 형태로 반환"비밀번호가 틀렸습니다.";
		}
		
		//로그인 시 Jwt 생성
		String accessToken = JwtProvider.createAccessToken(userId); //유저 아이디 액세스 토큰
		String refreshToken = JwtProvider.createRefreshToken(); // 리프레시 토큰
		
		System.out.println(accessToken);
		System.out.println(refreshToken);
		System.out.println(user.getNickName());
		
		try {
	        // JSON 형태로 변환
	        ObjectMapper objectMapper = new ObjectMapper();
	        Map<String, String> response = Map.of(
	            "accessToken", accessToken,
	            "refreshToken", refreshToken,
	            "nickname", user.getNickName()
	        );
		 return objectMapper.writeValueAsString(response); // JSON 문자열 반환
    } catch (Exception e) {
        return "{\"message\":\"서버 오류 발생\"}";
    }

	}
	
	//유저 아이디 및 비밀번호 찾기
	@PostMapping("/user/find-id")
    public ResponseEntity<?> findUserId(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        
        // 이메일로 유저 찾기
        User user = userService.getUserForEmain(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("이메일과 일치하는 아이디가 없습니다.");
        }
        
        emailService.sendIdEmail(email,user.getUserId());

        return ResponseEntity.ok("{\"message\": \"이메일로 아이디를 전송했습니다.\"}");
    }
	
    //  비밀번호 찾기 API (이메일로 비밀번호 재설정 링크 전송)
    @PostMapping("/user/find-password")
    public ResponseEntity<?> sendPasswordResetEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        User user = userService.getUserForEmain(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("이메일과 일치하는 계정이 없습니다.");
        }

      
     //  비밀번호 재설정 링크 생성 (JWT 포함)
        String resetToken = JwtProvider.createAccessToken(user.getUserId());
        String resetUrl = "http://localhost:3000/reset-password?token=" + resetToken;
        
        //  이메일 전송
        emailService.sendPasswordResetEmail(email,resetUrl);

        return ResponseEntity.ok("{\"message\": \"비밀번호 재설정 링크를 이메일로 전송했습니다.\"}");
    }
	
    //리셋 URL 
    @PostMapping("/user/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");

        //  토큰에서 사용자 ID 추출
        String userId = JwtProvider.getUserIdFromToken(token);
        if (userId == null) {
            return ResponseEntity.badRequest().body("{\"message\": \"유효하지 않은 토큰입니다.\"}");
        }

        //  비밀번호 암호화 후 업데이트
        try {
            String encryptedPassword = SHA256Encryptor.encrypt(newPassword);
            userService.updatePassword(userId, encryptedPassword);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("{\"message\": \"비밀번호 변경 실패\"}");
        }

        return ResponseEntity.ok("{\"message\": \"비밀번호가 성공적으로 변경되었습니다.\"}");
    }

    
    
}
