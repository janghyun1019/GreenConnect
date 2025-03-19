package com.app.controller;

import com.app.dao.signup.UserDAO;
import com.app.dto.user.User;
import com.app.utill.SHA256Encryptor;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000") // 프론트엔드 도메인 허용
public class AuthController {
    private final UserDAO userDAO;
    

    public AuthController(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @PostMapping("/google-login")
    public Map<String, Object> googleLogin(@RequestBody Map<String, String> request) {
        String code = request.get("code");
        Map<String, Object> response = new HashMap<>();

        try {
            //  Google OAuth 2.0 Access Token 요청
            String tokenRequestUrl = "https://oauth2.googleapis.com/token?"
                    + "client_id=290972713499-agpe9v71ip774sidcveg0tbuc19b2t2e.apps.googleusercontent.com"
                    + "&client_secret=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"
                    + "&redirect_uri=http://localhost:3000/auth/google/callback"
                    + "&grant_type=authorization_code"
                    + "&code=" + code;

            RestTemplate restTemplate = new RestTemplate();
            String tokenResponse = restTemplate.postForObject(tokenRequestUrl, null, String.class);

            //  JSON-Simple을 사용하여 Access Token 추출
            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject) parser.parse(tokenResponse);
            String accessToken = (String) jsonObject.get("access_token");

            //  Google API를 사용하여 사용자 정보 가져오기
            String userInfoUrl = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + accessToken;
            String userResponse = restTemplate.getForObject(userInfoUrl, String.class);

            JSONObject userJson = (JSONObject) parser.parse(userResponse);
            String email = (String) userJson.get("email");
            String name = (String) userJson.get("name");

            //  DB에서 사용자 조회
            User user = userDAO.getUserByEmail(email);

            //  사용자가 없으면 새로 생성 후 저장
            if (user == null) {
            	user = new User();
                user.setUserId(UUID.randomUUID().toString());
                String randomPassword = UUID.randomUUID().toString().substring(0, 20); // 길이 제한 예시
                user.setPassword(SHA256Encryptor.encrypt(randomPassword));
                user.setUserName("google_" + email.split("@")[0]); // 기본 username
                user.setEmail(email);
                user.setNickName(name);
                user.setTel("N/A"); // 기본값
                user.setUserType("GOOGLE");
                System.out.println("Inserting user: " + user.toString());
                userDAO.insertUser(user);
            }

         // 응답 데이터 준비
            response.put("success", true);
            response.put("userId", user.getUserId());
            response.put("nickname", user.getNickName());
            response.put("email", user.getEmail());
            response.put("message", "Google 로그인 성공: " + user.getNickName());

            return response;
            
        } catch (ParseException e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "JSON 파싱 실패");
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "Google 로그인 실패");
            return response;
        }
    }
}
