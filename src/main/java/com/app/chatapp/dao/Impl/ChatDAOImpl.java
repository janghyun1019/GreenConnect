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
    private SqlSession sqlSession;

    // 기존
    @Autowired
    public ChatDAOImpl(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    // 기존
    @Override
    public List<Map<String, Object>> getMessagesByRoomId(Long roomId, int page, int size) {
        Map<String, Object> params = new HashMap<>();
        params.put("roomId", roomId);
        params.put("offset", page * size);
        params.put("size", size);
        return sqlSession.selectList("ChatMapper.getMessagesByRoomId", params);
    }

    // 기존
    @Override
    public Long saveMessage(Long roomId, String senderId, String content, String imageUrls) {
        Map<String, Object> params = new HashMap<>();
        params.put("roomId", roomId);
        params.put("senderId", senderId);
        params.put("content", content);
        params.put("imageUrls", imageUrls);
        sqlSession.insert("ChatMapper.saveMessage", params);
        return (Long) params.get("messageId");
    }

    // 기존
    @Override
    public void saveImageUrl(Map<String, Object> params) {
        sqlSession.insert("ChatMapper.saveImageUrl", params);
    }

    // 기존
    @Override
    public String getTargetUserId(Long roomId, String senderId) {
        Map<String, Object> params = new HashMap<>();
        params.put("roomId", roomId);
        params.put("senderId", senderId);
        return sqlSession.selectOne("ChatMapper.getTargetUserId", params);
    }

    // 기존
    @Override
    public void markMessageAsRead(Long messageId) {
        sqlSession.update("ChatMapper.markMessageAsRead", messageId);
    }

    // 기존
    @Override
    public List<ChatRoomDTO> getChatRooms(String userId) {
        return sqlSession.selectList("ChatMapper.getChatRooms", userId);
    }

    // 기존
    @Override
    public void leaveChatRoom(Long roomId, String userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("roomId", roomId);
        params.put("userId", userId);
        sqlSession.update("ChatMapper.leaveChatRoom", params);
    }

    // 기존
    @Override
    public void deleteChatRoom(Long roomId, String userId) {
        leaveChatRoom(roomId, userId);
        Map<String, Object> params = new HashMap<>();
        params.put("roomId", roomId);
        sqlSession.delete("ChatMapper.deleteChatRoom", params);
    }

    // 기존 + [확장]: 채팅방 생성 (로깅 추가)
    @Override
    public ChatRoomDTO createChatRoom(String user1Id, String user2Id) {
        Map<String, String> params = new HashMap<>();
        params.put("user1Id", user1Id);
        params.put("user2Id", user2Id);
        ChatRoomDTO existingRoom = sqlSession.selectOne("ChatMapper.findChatRoomByUsers", params);
        if (existingRoom != null) {
            // [확장] 기존 채팅방 반환 시 로그 추가
            System.out.println("[확장] 기존 채팅방 반환: roomId=" + existingRoom.getRoomId());
            return existingRoom;
        }
        ChatRoomDTO newRoom = new ChatRoomDTO();
        newRoom.setUser1Id(user1Id);
        newRoom.setUser2Id(user2Id);
        newRoom.setUser1Active("Y");
        newRoom.setUser2Active("Y");
        // [확장] 삽입 전 로그 추가
        System.out.println("[확장] 채팅방 삽입 시도: user1Id=" + user1Id + ", user2Id=" + user2Id);
        sqlSession.insert("ChatMapper.createChatRoom", newRoom);
        // [확장] 생성 후 로그 및 검증 추가
        System.out.println("[확장] 새 채팅방 생성 완료: roomId=" + newRoom.getRoomId() + ", user1Id=" + user1Id + ", user2Id=" + user2Id);
        if (newRoom.getRoomId() == null) {
            System.err.println("[확장] roomId 반환 실패: 시퀀스 또는 테이블 설정 확인 필요");
            throw new RuntimeException("채팅방 생성 실패: roomId가 반환되지 않음");
        }
        return newRoom;
    }

    // 기존
    @Override
    public ChatRoomDTO findChatRoomByUsers(Map<String, String> params) {
        return sqlSession.selectOne("ChatMapper.findChatRoomByUsers", params);
    }

    // 기존
    @Override
    public void deleteMessagesByRoomId(Long roomId) {
        sqlSession.delete("ChatMapper.deleteMessagesByRoomId", roomId);
    }
}