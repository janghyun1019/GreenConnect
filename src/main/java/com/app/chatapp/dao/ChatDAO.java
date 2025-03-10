package com.app.chatapp.dao;

import com.app.chatapp.dto.ChatRoomDTO;

import java.util.List;

public interface ChatDAO {
	// userId 가 참여한 채팅방 목록 조회하는 기능
    List<ChatRoomDTO> findChatRoomsByUserId(String userId);
    
    // 새로운 메시지를 저장하는 기능
    Long saveMessage(Long roomId, String senderId, String content, String imageUrls);
    
    // 채팅방의 ID를 사용해서 정보를 조회하는 기능
    ChatRoomDTO findChatRoomById(Long roomId);
    
    // 메시지를 읽음처리 하는 기능
    void markMessageAsRead(Long messageId);
    
    // 채팅방에서 userId의 상태를 업데이트 하여 방을 나가는 기능
    void updateChatRoomActiveStatus(Long roomId, String userId, String status);
}