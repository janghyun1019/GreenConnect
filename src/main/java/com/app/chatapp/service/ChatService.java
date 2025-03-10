
package com.app.chatapp.service;

import com.app.chatapp.dto.ChatRoomDTO;

import java.util.List;

public interface ChatService {
	// userId 가 참여한 채팅방 목록을 조회하는 서비스
    List<ChatRoomDTO> getChatRooms(String userId);
    
    // 새로운 메시지를 저장하는 서비스
    Long saveMessage(Long roomId, String senderId, String content, String imageUrls);
    
    // 채팅방의 상대방 ID를 가져오는 서비스
    String getTargetUserId(Long roomId, String senderId);
    
    // 메시지를 읽음 처리하는 서비스
    void markMessageAsRead(Long messageId);
    
    // 채팅방 에서 나가는 서비스
    void leaveChatRoom(Long roomId, String userId);
}