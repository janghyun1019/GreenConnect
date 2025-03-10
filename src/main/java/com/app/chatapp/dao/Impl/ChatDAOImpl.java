package com.app.chatapp.dao.Impl;

import com.app.chatapp.dao.ChatDAO;
import com.app.chatapp.dto.ChatRoomDTO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ChatDAOImpl implements ChatDAO {
    private final SqlSessionTemplate sqlSession;

    public ChatDAOImpl(SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }
   
    // userId에 해당하는 모든 채팅방을 조회
    @Override
    public List<ChatRoomDTO> findChatRoomsByUserId(String userId) {
        return sqlSession.selectList("ChatMapper.findChatRoomsByUserId", userId);
    }

    // 새로운 메시지를 저장
    @Override
    public Long saveMessage(Long roomId, String senderId, String content, String imageUrls) {
        Map<String, Object> params = new HashMap<>();
        params.put("roomId", roomId);
        params.put("senderId", senderId);
        params.put("content", content);
        params.put("imageUrls", imageUrls);
        sqlSession.insert("ChatMapper.saveMessage", params);
        return sqlSession.selectOne("ChatMapper.getLastInsertedId");
    }

    // userId에 해당하는 채팅방 정보를 조회
    @Override
    public ChatRoomDTO findChatRoomById(Long roomId) {
        return sqlSession.selectOne("ChatMapper.findChatRoomById", roomId);
    }

    // 메시지를 읽음 처리
    @Override
    public void markMessageAsRead(Long messageId) {
        sqlSession.update("ChatMapper.markMessageAsRead", messageId);
    }

    //채팅방 나가기
    @Override
    public void updateChatRoomActiveStatus(Long roomId, String userId, String status) {
        Map<String, Object> params = new HashMap<>();
        params.put("roomId", roomId);
        params.put("userId", userId);
        params.put("status", status);
        sqlSession.update("ChatMapper.updateChatRoomActiveStatus", params);
    }
}