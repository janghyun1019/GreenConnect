package com.app.chatapp.dao.Impl;

import com.app.chatapp.dao.ChatDAO;
import com.app.chatapp.dto.ChatRoomDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ChatDAOImpl implements ChatDAO {
    private final SqlSession sqlSession;

    @Autowired
    public ChatDAOImpl(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    @Override
    public List<Map<String, Object>> getMessagesByRoomId(Long roomId, int page, int size) {
        Map<String, Object> params = new HashMap<>();
        params.put("roomId", roomId);
        params.put("offset", page * size);
        params.put("size", size);
        return sqlSession.selectList("ChatMapper.getMessagesByRoomId", params);
    }

    @Override
    public Long saveMessage(Long roomId, String senderId, String content, String imageUrls) {
        Map<String, Object> params = new HashMap<>();
        params.put("roomId", roomId);
        params.put("senderId", senderId);
        params.put("content", content);
        params.put("imageUrls", imageUrls);
        sqlSession.insert("ChatMapper.saveMessage", params);
        return (Long) params.get("messageId"); // 트리거로 생성된 messageId 반환
    }

    @Override
    public String getTargetUserId(Long roomId, String senderId) {
        Map<String, Object> params = new HashMap<>();
        params.put("roomId", roomId);
        params.put("senderId", senderId);
        return sqlSession.selectOne("ChatMapper.getTargetUserId", params);
    }

    @Override
    public void markMessageAsRead(Long messageId) {
        sqlSession.update("ChatMapper.markMessageAsRead", messageId);
    }

    @Override
    public List<ChatRoomDTO> getChatRooms(String userId) {
        return sqlSession.selectList("ChatMapper.getChatRooms", userId);
    }

    @Override
    public void leaveChatRoom(Long roomId, String userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("roomId", roomId);
        params.put("userId", userId);
        sqlSession.update("ChatMapper.leaveChatRoom", params);
    }

    @Override
    public void deleteChatRoom(Long roomId, String userId) {
        leaveChatRoom(roomId, userId);
    }

    @Override
    public ChatRoomDTO createChatRoom(String user1Id, String user2Id) {
        Map<String, String> params = new HashMap<>();
        params.put("user1Id", user1Id);
        params.put("user2Id", user2Id);
        ChatRoomDTO existingRoom = sqlSession.selectOne("ChatMapper.findChatRoomByUsers", params);
        if (existingRoom != null) {
            return existingRoom;
        }
        ChatRoomDTO newRoom = new ChatRoomDTO();
        newRoom.setUser1Id(user1Id);
        newRoom.setUser2Id(user2Id);
        newRoom.setUser1Active("Y");
        newRoom.setUser2Active("Y");
        sqlSession.insert("ChatMapper.createChatRoom", newRoom);
        return newRoom; // roomId는 <selectKey>에서 설정됨
    }

    @Override
    public ChatRoomDTO findChatRoomByUsers(Map<String, String> params) {
        return sqlSession.selectOne("ChatMapper.findChatRoomByUsers", params);
    }
}