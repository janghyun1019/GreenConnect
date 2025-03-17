package com.app.chatapp.service;

import com.app.chatapp.dto.ChatRoomDTO;

import java.util.List;
import java.util.Map;

public interface ChatService {
    // 기존 메서드들
    List<Map<String, Object>> getMessagesByRoomId(Long roomId, int page, int size);
    Long saveMessage(Long roomId, String senderId, String content, String imageUrls);
    String getTargetUserId(Long roomId, String senderId);
    void markMessageAsRead(Long messageId);
    List<ChatRoomDTO> getChatRooms(String userId);
    void leaveChatRoom(Long roomId, String userId);
    void deleteChatRoom(Long roomId, String userId);
    ChatRoomDTO createChatRoom(String user1Id, String user2Id);
    Long saveMessage(Long roomId, String senderId, String content, List<String> imageUrls);
}