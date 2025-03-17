package com.app.chatapp.service.Impl;

import com.app.chatapp.dao.ChatDAO;
import com.app.chatapp.dto.ChatRoomDTO;
import com.app.chatapp.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatDAO chatDAO;

    // 기존: 메시지 조회
    @Override
    public List<Map<String, Object>> getMessagesByRoomId(Long roomId, int page, int size) {
        return chatDAO.getMessagesByRoomId(roomId, page, size);
    }

    // 기존: 다중 이미지 포함 메시지 저장
    @Override
    public Long saveMessage(Long roomId, String senderId, String content, List<String> imageUrls) {
        String imageUrlsJson = imageUrls != null && !imageUrls.isEmpty() ? String.join(",", imageUrls) : null;
        Long messageId = chatDAO.saveMessage(roomId, senderId, content, imageUrlsJson);
        if (imageUrls != null && !imageUrls.isEmpty()) {
            saveImageUrls(messageId, imageUrls);
        }
        System.out.println("[확장] 메시지 저장 완료: messageId=" + messageId + ", imageUrls=" + imageUrlsJson);
        return messageId;
    }

    // 기존: 단일 메시지 저장
    @Override
    public Long saveMessage(Long roomId, String senderId, String content, String imageUrls) {
        Long messageId = chatDAO.saveMessage(roomId, senderId, content, imageUrls);
        if (imageUrls != null && !imageUrls.isEmpty()) {
            List<String> urls = Collections.singletonList(imageUrls);
            saveImageUrls(messageId, urls);
        }
        return messageId;
    }

    // 기존: 이미지 URL 저장
    private void saveImageUrls(Long messageId, List<String> imageUrls) {
        for (String url : imageUrls) {
            Map<String, Object> params = new HashMap<>();
            params.put("messageId", messageId);
            params.put("imageUrl", url);
            chatDAO.saveImageUrl(params);
            System.out.println("[확장] DB에 이미지 저장: messageId=" + messageId + ", url=" + url);
        }
    }

    // 기존: 타겟 사용자 ID 조회
    @Override
    public String getTargetUserId(Long roomId, String senderId) {
        return chatDAO.getTargetUserId(roomId, senderId);
    }

    // 기존: 메시지 읽음 처리
    @Override
    public void markMessageAsRead(Long messageId) {
        chatDAO.markMessageAsRead(messageId);
    }

    // 기존: 채팅방 목록 조회
    @Override
    public List<ChatRoomDTO> getChatRooms(String userId) {
        List<ChatRoomDTO> rooms = chatDAO.getChatRooms(userId);
        return rooms != null ? rooms : Collections.emptyList();
    }

    // 기존: 채팅방 생성
    @Override
    public ChatRoomDTO createChatRoom(String user1Id, String user2Id) {
        return chatDAO.createChatRoom(user1Id, user2Id);
    }

    // 기존: 채팅방 떠나기
    @Override
    public void leaveChatRoom(Long roomId, String userId) {
        chatDAO.leaveChatRoom(roomId, userId);
        System.out.println("[확장] 채팅방 떠나기 완료: roomId=" + roomId + ", userId=" + userId);
    }

    // 기존 + [확장]: 채팅방 삭제 (구현 추가)
    @Override
    public void deleteChatRoom(Long roomId, String userId) {
        // [확장] 실제 삭제 로직 추가
        chatDAO.deleteChatRoom(roomId, userId);
        // [확장] 관련 메시지 삭제 (선택적)
        chatDAO.deleteMessagesByRoomId(roomId); // ChatDAO에 메서드 추가 필요
        System.out.println("[확장] 채팅방 및 메시지 삭제 완료: roomId=" + roomId + ", userId=" + userId);
    }
}