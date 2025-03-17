package com.app.chatapp.controller;

import com.app.chatapp.dto.ChatRoomDTO;
import com.app.chatapp.handler.ChatWebSocketHandler;
import com.app.chatapp.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ChatController {
    private final ChatService chatService;
    private final ChatWebSocketHandler webSocketHandler;

    @Autowired
    public ChatController(ChatService chatService, ChatWebSocketHandler webSocketHandler) {
        this.chatService = chatService;
        this.webSocketHandler = webSocketHandler;
    }

    // 기존: 메시지 읽음 처리 (변환 추가)
    @PostMapping("/chat/read")
    public ResponseEntity<Void> markAsRead(@RequestBody Map<String, Object> data) {
        Long roomId = Long.parseLong(data.get("roomId").toString());
        Long messageId = Long.parseLong(data.get("messageId").toString());
        String userId = data.get("userId").toString();
        chatService.markMessageAsRead(messageId);
        try {
            webSocketHandler.sendReadReceipt(roomId.toString(), userId, messageId); // [확장] Long -> String 변환
            System.out.println("[확장] 읽음 처리 완료: roomId=" + roomId + ", messageId=" + messageId + ", userId=" + userId);
        } catch (Exception e) {
            System.err.println("[확장] 읽음 알림 전송 실패: " + e.getMessage());
            return ResponseEntity.status(500).build();
        }
        return ResponseEntity.ok().build();
    }

    // 기존 + [확장]: 채팅방 목록 조회 (로깅 추가)
    @GetMapping("/chat/rooms/{userId}")
    public ResponseEntity<List<ChatRoomDTO>> getChatRooms(@PathVariable String userId) {
        List<ChatRoomDTO> rooms = chatService.getChatRooms(userId);
        System.out.println("[확장] 채팅방 목록 조회: userId=" + userId + ", rooms.size=" + rooms.size() + ", rooms=" + rooms);
        return ResponseEntity.ok(rooms);
    }

    // 기존: 채팅방 떠나기
    @PostMapping("/chat/leave/{roomId}/{userId}")
    public ResponseEntity<String> leaveChatRoom(@PathVariable Long roomId, @PathVariable String userId) {
        chatService.leaveChatRoom(roomId, userId);
        System.out.println("[확장] 채팅방 떠나기: roomId=" + roomId + ", userId=" + userId);
        return ResponseEntity.ok("Successfully left chat room");
    }

    // 기존: 채팅방 삭제
    @DeleteMapping("/chat/room/{roomId}/{userId}")
    public ResponseEntity<String> deleteChatRoom(@PathVariable Long roomId, @PathVariable String userId) {
        chatService.deleteChatRoom(roomId, userId);
        System.out.println("[확장] 채팅방 삭제: roomId=" + roomId + ", userId=" + userId);
        return ResponseEntity.ok("Successfully deleted chat room");
    }

    // 기존: 채팅방 생성
    @PostMapping("/chat/create")
    public ResponseEntity<ChatRoomDTO> createChatRoom(@RequestBody Map<String, String> data) {
        String user1Id = data.get("user1Id");
        String user2Id = data.get("user2Id");
        if (user1Id == null || user2Id == null || user1Id.trim().isEmpty() || user2Id.trim().isEmpty()) {
            System.err.println("[확장] 채팅방 생성 실패: user1Id 또는 user2Id가 유효하지 않음");
            return ResponseEntity.badRequest().body(null);
        }
        try {
            ChatRoomDTO room = chatService.createChatRoom(user1Id, user2Id);
            System.out.println("[확장] 채팅방 생성 성공: roomId=" + room.getRoomId() + ", user1Id=" + user1Id + ", user2Id=" + user2Id);
            return ResponseEntity.ok(room);
        } catch (Exception e) {
            System.err.println("[확장] 채팅방 생성 실패: " + e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }

    @Value("${file.upload-dir:/uploads}")
    private String uploadDir;

    // 기존: 이미지 업로드
    @PostMapping("/upload")
    public ResponseEntity<List<String>> uploadImages(@RequestParam("images") List<MultipartFile> files) {
        List<String> imageUrls = new ArrayList<>();
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        try {
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
                    String filePath = uploadDir + File.separator + fileName;
                    file.transferTo(new File(filePath));
                    String imageUrl = "http://localhost:8080/uploads/" + fileName;
                    imageUrls.add(imageUrl);
                    System.out.println("[확장] 이미지 업로드 성공: " + imageUrl);
                }
            }
            System.out.println("[확장] 업로드된 이미지 URL 목록: " + imageUrls);
            return ResponseEntity.ok(imageUrls);
        } catch (IOException e) {
            System.err.println("[확장] 이미지 업로드 실패: " + e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }
}