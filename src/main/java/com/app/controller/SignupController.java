package com.app.controller;

import java.security.NoSuchAlgorithmException;
import java.util.Map;
<<<<<<< HEAD
import java.util.Objects;
import java.util.Random;
=======
>>>>>>> 5d05381daba2bfbbffc5fdd75f0c3bc97b69a537

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
=======
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
>>>>>>> 5d05381daba2bfbbffc5fdd75f0c3bc97b69a537
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.user.User;
import com.app.service.signup.MailService;
<<<<<<< HEAD
import com.app.service.signup.SignupUserService;
=======
import com.app.service.signup.UserService;
>>>>>>> 5d05381daba2bfbbffc5fdd75f0c3bc97b69a537
import com.app.utill.JwtProvider;
import com.app.utill.SHA256Encryptor;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class SignupController {

	@Autowired
<<<<<<< HEAD
	SignupUserService userService;

	@Autowired
	private MailService emailService; // 이메일 전송 서비스

	@PostMapping("api/user/signup")
=======
	UserService userService;
	
	 @Autowired
	 private MailService emailService; // 이메일 전송 서비스

	@PostMapping("/user/signup")
>>>>>>> 5d05381daba2bfbbffc5fdd75f0c3bc97b69a537
	public String signupAction(@RequestBody User user) {

		if (user.getUserId() == null || user.getUserId().trim().isEmpty()) {
			return "fail"; // userId가 없으면 회원가입 실패
		}
<<<<<<< HEAD

		try {
			// 유저 비밀번호 암호화
			String encPw = SHA256Encryptor.encrypt(user.getPassword());
			user.setPassword(encPw);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}

=======
		
		try {
			// 유저 비밀번호 암호화
			 String encPw = SHA256Encryptor.encrypt(user.getPassword());
			 user.setPassword(encPw);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		
>>>>>>> 5d05381daba2bfbbffc5fdd75f0c3bc97b69a537
		user.setUserType("CUS");

		int result = userService.registerUser(user);

		System.out.println("회원가입 처리 결과 " + result);

		if (result > 0) {
			return "ok";
		} else {
			return "fail";
		}
	}
<<<<<<< HEAD
	
	
	
	// 로그인 시 API 발급 (JWT 방식)
	@PostMapping("/api/user/login")
	public String login(@RequestBody Map<String, String> loginInfo, User user) {
		System.out.println("로그인 요청 처리 중: " + loginInfo.get("userId"));
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

		// 유저 정보 조회
		user = userService.getUser(userId);

		if (user == null) { // 유저가 존재 하지 않을 경우
			return "{\"message\":\"아이디가 존재하지 않습니다.\"}"; // JSON 형태로 반환
		}

		if (!userPw.equals(user.getPassword())) { // 매개변수 입력된 유저 비밀번호와 비교
			return "{\"message\":\"비밀번호가 틀렸습니다.\"}"; // JSON 형태로 반환"비밀번호가 틀렸습니다.";
		}

		// 로그인 시 Jwt 생성
		String accessToken = JwtProvider.createAccessToken(userId); // 유저 아이디 액세스 토큰
		String refreshToken = JwtProvider.createRefreshToken(); // 리프레시 토큰

		System.out.println(accessToken);
		System.out.println(refreshToken);
		System.out.println(user.getNickName());
		System.out.println(user.getUserId());

		try {
			// JSON 형태로 변환
			ObjectMapper objectMapper = new ObjectMapper();
			Map<String, String> response = Map.of("accessToken", accessToken, "refreshToken", refreshToken, "nickname",
					user.getNickName(),"userId", user.getUserId(),"email",user.getEmail());
			
			return objectMapper.writeValueAsString(response); // JSON 문자열 반환
		} catch (Exception e) {
			return "{\"message\":\"서버 오류 발생\"}";
		}

	}

	// 유저 이메일 발송
	@PostMapping("api/user/sendVerificationEmail")
	public String sendVerificationEmail(@RequestBody Map<String, String> request, HttpSession session) {
		String email = request.get("email");

		// 인증코드 발송 및 세션에 저장
		// 랜던 6자리 인증코드 생성
		String verificationCode = String.format("%06d", new Random().nextInt(1000000));

		// 세션에 발송 인증 코드 emailVerificationCode 라는 이름으로 코드 저장
		session.setAttribute("emailVerificationCode", verificationCode);

		// 세션 인증코드 및 만료시간 저장 (3분 기준) 3*60*1000(1초)
		long expirationTime = System.currentTimeMillis() + (3 * 60 * 1000);
		session.setAttribute("emailVerificationExpiration", expirationTime);

		// 비동기 메일 전송
		// 콘솔에 인증코드 출력 (디버깅용)
		System.out.println("발송 인증 코드 :" + verificationCode);
		// 이메일로 발송
		emailService.sendVerificationEmail(email, verificationCode);

		return "인증 이메일이 발송 되었습니다. (3분 이내 입력)";
	}

	// 유저 이메일 코드 이메일 인증
	@PostMapping("api/user/verifyEmail")
	public String verifyEmail(@RequestBody Map<String, String> request, HttpSession session) {

		// 유저가 입력한 코드
		String inputCode = request.get("code");

		// 세션에 저장된 코드랑 만료 시간
		String sessionCode = (String) session.getAttribute("emailVerificationCode");
		Long expirationTime = (Long) session.getAttribute("emailVerificationExpiration");

		System.out.println("사용자가 입력한 코드: " + inputCode);
		System.out.println("세션에 저장된 코드: " + sessionCode);

		// 코드가 없거나 코드 시간이 없거나 시간이 지났을 경우
		if (sessionCode == null || expirationTime == null || System.currentTimeMillis() > expirationTime) {
			session.invalidate(); // 세션 초기화
			return "인증 코드가 만료되었습니다. 다시 요청하세요.";
		}

		if (Objects.equals(sessionCode.trim(), inputCode.trim())) {
			session.invalidate();
			return "YES";
		} else {
			return "인증 코드가 올바르지 않습니다.";
		}
	}

	// 유저 아이디 및 비밀번호 찾기
	@PostMapping("api/user/find-id")
	public ResponseEntity<?> findUserId(@RequestBody Map<String, String> request) {
		
		String username = request.get("userName");
		String tel = request.get("tel");
		String email = request.get("email");

		System.out.println(username);
		System.out.println(tel);
		System.out.println(email);
		
		// 이메일로 유저 찾기
		
		User user = userService.getUserForEmail(email);
		
		if (user == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("이메일과 일치하는 아이디가 없습니다.");
		}
		
		if (!user.getUserName().equals(username)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("입력한 이름과 이메일이 일치하지 않습니다.");
		}
		
		if (!user.getTel().equals(tel)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("입력한 전화번호와 이메일이 일치하지 않습니다.");
		}

		emailService.sendIdEmail(email, user.getUserId());

		return ResponseEntity.ok("{\"message\": \"이메일로 아이디를 전송했습니다.\"}");
	}

	// 비밀번호 찾기 API (이메일로 비밀번호 재설정 링크 전송)
	@PostMapping("api/user/find-password")
	public ResponseEntity<?> sendPasswordResetEmail(@RequestBody Map<String, String> request) {
		
		String userId = request.get("userId");
		String username = request.get("userName");
		String tel = request.get("tel");
		String email = request.get("email");

		System.out.println(userId);
		System.out.println(username);
		System.out.println(tel);
		System.out.println(email);
		
		
		User user = userService.getUserForEmail(email);

		if (user == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("이메일과 일치하는 아이디가 없습니다.");
		}
		
		if (!user.getUserName().equals(username)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("입력한 이름과 이메일이 일치하지 않습니다.");
		}
		
		if (!user.getTel().equals(tel)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("입력한 전화번호와 이메일이 일치하지 않습니다.");
		}
		
		if (!user.getUserId().equals(userId)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("입력한 아이디와 이메일이 일치하지 않습니다.");
		}

		// 비밀번호 재설정 링크 생성 (JWT 포함)
		String resetToken = JwtProvider.createAccessToken(user.getUserId());
		String resetUrl = "http://localhost:3000/reset-password?token=" + resetToken;

		// 이메일 전송
		emailService.sendPasswordResetEmail(email, resetUrl);

		return ResponseEntity.ok("{\"message\": \"비밀번호 재설정 링크를 이메일로 전송했습니다.\"}");
	}

	// 리셋 URL
	@PostMapping("api/user/reset-password")
	public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
		String token = request.get("token");
		String newPassword = request.get("newPassword");

		// 토큰에서 사용자 ID 추출
		String userId = JwtProvider.getUserIdFromToken(token);
		if (userId == null) {
			return ResponseEntity.badRequest().body("{\"message\": \"유효하지 않은 토큰입니다.\"}");
		}

		// 비밀번호 암호화 후 업데이트
		try {
			String encryptedPassword = SHA256Encryptor.encrypt(newPassword);
			userService.updatePassword(userId, encryptedPassword);
		} catch (Exception e) {
			return ResponseEntity.internalServerError().body("{\"message\": \"비밀번호 변경 실패\"}");
		}

		return ResponseEntity.ok("{\"message\": \"비밀번호가 성공적으로 변경되었습니다.\"}");
	}

	// 유저 중복체크 검사

	@RequestMapping("api/user/checkDupId") // 아이디 중복체크
	public String checkDupId(@RequestBody Map<String, String> data) {

		System.out.println("/user/checkDupId 요청 들어옴");

		System.out.println("받은 데이터: " + data); // {value= 값}

		String userId = data.get("value"); // 🔹 JSON의 "value" 값을 가져옴

		System.out.println("추출된 ID: " + userId); // 값
		if (userId.length() < 4) {
			return "B";
		}

		boolean result = userService.isDuplicatedId(userId);

		return result ? "Y" : "N";
	}

	@RequestMapping("api/user/checkDupNickName")
	public String checkDupnickName(@RequestBody Map<String, String> data) {

		System.out.println("/user/checkDupnickName요청 들어옴");
		System.out.println(data);

		System.out.println("받은 데이터: " + data); // {value= 값}

		String userNick = data.get("value"); // 🔹 JSON의 "value" 값을 가져옴

		System.out.println("추출된 닉네임: " + userNick); // 값

		boolean result = userService.isDuplicatedNick(userNick);

		if (userNick.length() < 2) {
			return "B";
		}

		return result ? "Y" : "N";

	}

	@RequestMapping("api/user/checkDupTel")
	public String checkDupnickTel(@RequestBody Map<String, String> data) {

		System.out.println("/user/checkDupTel요청 들어옴");
		System.out.println(data);

		System.out.println("받은 데이터: " + data); // {value= 값}

		String userTel = data.get("value"); // 🔹 JSON의 "value" 값을 가져옴
		
		System.out.println("추출된 닉네임: " + userTel); // 값

		boolean result = userService.isDuplicatedTel(userTel);

		return result ? "Y" : "N";
	}

	@RequestMapping("api/user/checkDupEmail")
	public String checkDupEmail(@RequestBody Map<String, String> data) {

		System.out.println("/user/checkDupEmail요청 들어옴");
		System.out.println(data);
		
		System.out.println("받은 데이터: " + data); // {value= 값}

		String userEmail = data.get("value"); // 🔹 JSON의 "value" 값을 가져옴
		
		System.out.println("추출된 닉네임: " + userEmail); // 값

		boolean result = userService.isDuplicatedEmail(userEmail);

		return result ? "Y" : "N";
	}

}
=======

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
>>>>>>> 5d05381daba2bfbbffc5fdd75f0c3bc97b69a537
