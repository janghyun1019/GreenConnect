package com.app.chatapp.dao;

import com.app.chatapp.dto.ChatRoomDTO;

import java.util.List;
import java.util.Map;

public interface ChatDAO {
    List<Map<String, Object>> getMessagesByRoomId(Long roomId, int page, int size);
    Long saveMessage(Long roomId, String senderId, String content, String imageUrls);
    String getTargetUserId(Long roomId, String senderId);
    void markMessageAsRead(Long messageId);
    List<ChatRoomDTO> getChatRooms(String userId);
    void leaveChatRoom(Long roomId, String userId);
    void deleteChatRoom(Long roomId, String userId);
    ChatRoomDTO createChatRoom(String user1Id, String user2Id);
    ChatRoomDTO findChatRoomByUsers(Map<String, String> params);
    void saveImageUrl(Map<String, Object> params);
    // [확장] 채팅방 메시지 삭제 메서드 추가
    void deleteMessagesByRoomId(Long roomId);
}