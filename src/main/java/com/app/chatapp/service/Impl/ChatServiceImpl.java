package com.app.chatapp.service.Impl;

import com.app.chatapp.dao.ChatDAO;
import com.app.chatapp.dto.ChatRoomDTO;
import com.app.chatapp.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ChatServiceImpl implements ChatService {
    private final ChatDAO chatDAO;

    @Autowired
    public ChatServiceImpl(ChatDAO chatDAO) {
        this.chatDAO = chatDAO;
    }

    @Override
    public List<Map<String, Object>> getMessagesByRoomId(Long roomId, int page, int size) {
        return chatDAO.getMessagesByRoomId(roomId, page, size);
    }

    @Override
    public Long saveMessage(Long roomId, String senderId, String content, String imageUrls) {
        return chatDAO.saveMessage(roomId, senderId, content, imageUrls);
    }

    @Override
    public String getTargetUserId(Long roomId, String senderId) {
        return chatDAO.getTargetUserId(roomId, senderId);
    }

    @Override
    public void markMessageAsRead(Long messageId) {
        chatDAO.markMessageAsRead(messageId);
    }

    @Override
    public List<ChatRoomDTO> getChatRooms(String userId) {
        return chatDAO.getChatRooms(userId);
    }

    @Override
    public void leaveChatRoom(Long roomId, String userId) {
        chatDAO.leaveChatRoom(roomId, userId);
    }

    @Override
    public void deleteChatRoom(Long roomId, String userId) {
        chatDAO.deleteChatRoom(roomId, userId);
    }

    @Override
    public ChatRoomDTO createChatRoom(String user1Id, String user2Id) {
        return chatDAO.createChatRoom(user1Id, user2Id);
    }
}