package com.app.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.profile.Profile;
import com.app.service.profile.ProfileService;

@RestController
@RequestMapping("/profile")
public class MyPageController {
    
    @Value("${file.upload.dir}")
    private String uploadDir;
    
    @Autowired
    ProfileService profileService;
    
    @GetMapping("/{userId}")
    public ResponseEntity<Profile> getProfile(@PathVariable String userId) {
        return ResponseEntity.ok(profileService.getProfileByUserId(userId));
    }

    @PostMapping("/upload/{userId}")
    public ResponseEntity<String> uploadProfile(@PathVariable String userId, 
                                                @RequestParam("ProfileImage") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("파일이 없습니다.");
            }
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.write(filePath, file.getBytes());

            profileService.updateProfileImage(userId, fileName);
            return ResponseEntity.ok(fileName);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("파일 업로드 실패");
        }
    }

    @PostMapping("/delete/{userId}") // DELETE → POST
    public ResponseEntity<String> deleteProfileImage(@PathVariable String userId) {
        profileService.deleteProfileImage(userId);
        return ResponseEntity.ok("프로필 삭제 성공");
    }

    @PostMapping("/updateNickname/{userId}")
    public ResponseEntity<String> updateNickname(@PathVariable String userId, 
                                                 @RequestBody Map<String, String> request) {
        String newNickname = request.get("nickname");
        if (newNickname == null || newNickname.isEmpty()) {
            return ResponseEntity.badRequest().body("닉네임을 입력해주세요.");
        }

        profileService.updateNickname(userId, newNickname);
        return ResponseEntity.ok("닉네임이 변경되었습니다.");
    }
}