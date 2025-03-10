
package com.app.chatapp.service.Impl;

import com.app.chatapp.dao.ChatDAO;
import com.app.chatapp.dto.ChatRoomDTO;
import com.app.chatapp.service.ChatService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatServiceImpl implements ChatService {
    private final ChatDAO chatDAO;

    public ChatServiceImpl(ChatDAO chatDAO) {
        this.chatDAO = chatDAO;
    }
    
    //userId 가 채팅방 목록을 조회하는 서비스
    @Override
    public List<ChatRoomDTO> getChatRooms(String userId) {
        return chatDAO.findChatRoomsByUserId(userId);
    }

    // 메세지를 저장하는 서비스
    @Override
    public Long saveMessage(Long roomId, String senderId, String content, String imageUrls) {
        return chatDAO.saveMessage(roomId, senderId, content, imageUrls);
    }

    //상대방 찾는 서비스
    @Override
    public String getTargetUserId(Long roomId, String senderId) {
        ChatRoomDTO room = chatDAO.findChatRoomById(roomId);
        return room.getUser1Id().equals(senderId) ? room.getUser2Id() : room.getUser1Id();
    }

    //메세지 읽음처리 하는 서비스
    @Override
    public void markMessageAsRead(Long messageId) {
        chatDAO.markMessageAsRead(messageId);
    }
    
    // 채팅방 나가는 서비스
    @Override
    public void leaveChatRoom(Long roomId, String userId) {
        chatDAO.updateChatRoomActiveStatus(roomId, userId, "N");
    }
}