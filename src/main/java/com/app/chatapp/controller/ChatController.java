package com.app.chatapp.controller;

import com.app.chatapp.dto.ChatRoomDTO;
import com.app.chatapp.handler.ChatWebSocketHandler;
import com.app.chatapp.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

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

    @PostMapping("/chat/read")
    public ResponseEntity<Void> markAsRead(@RequestBody Map<String, Object> data) {
        Long roomId = Long.parseLong(data.get("roomId").toString());
        Long messageId = Long.parseLong(data.get("messageId").toString());
        String userId = data.get("userId").toString();
        chatService.markMessageAsRead(messageId);
        try {
            webSocketHandler.sendReadReceipt(roomId, userId, messageId);
        } catch (Exception e) {
            System.err.println("읽음 알림 전송 실패: " + e.getMessage());
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/chat/rooms/{userId}")
    public ResponseEntity<List<ChatRoomDTO>> getChatRooms(@PathVariable String userId) {
        return ResponseEntity.ok(chatService.getChatRooms(userId));
    }

    @PostMapping("/chat/leave/{roomId}/{userId}")
    public ResponseEntity<String> leaveChatRoom(@PathVariable Long roomId, @PathVariable String userId) {
        chatService.leaveChatRoom(roomId, userId);
        return ResponseEntity.ok("Successfully left chat room");
    }

    @DeleteMapping("/chat/room/{roomId}/{userId}")
    public ResponseEntity<String> deleteChatRoom(@PathVariable Long roomId, @PathVariable String userId) {
        chatService.deleteChatRoom(roomId, userId);
        return ResponseEntity.ok("Successfully deleted chat room");
    }

    @PostMapping("/chat/create")
    public ResponseEntity<ChatRoomDTO> createChatRoom(@RequestBody Map<String, String> data) {
        String user1Id = data.get("user1Id");
        String user2Id = data.get("user2Id");
        ChatRoomDTO room = chatService.createChatRoom(user1Id, user2Id);
        return ResponseEntity.ok(room);
    }
    
    @PostMapping("/upload")
    public ResponseEntity<List<String>> uploadImages(@RequestParam("images") List<MultipartFile> files) {
        List<String> urls = files.stream()
            .map(file -> {
                // 파일 저장 로직 (예: S3, 로컬 디스크)
                String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
                // 저장 후 URL 반환
                return "/images/" + fileName;
            })
            .collect(Collectors.toList());
        return ResponseEntity.ok(urls);
    }
}