package com.app.chatapp.handler;

import com.app.chatapp.dao.ChatDAO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final ChatDAO chatDAO;

    // 기존
    @Autowired
    public ChatWebSocketHandler(ChatDAO chatDAO) {
        this.chatDAO = chatDAO;
    }

    // 기존
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String userId = getUserId(session);
        String roomId = getRoomId(session);
        System.out.println("[확장] 클라이언트 연결: userId=" + userId + ", roomId=" + roomId + ", sessionId=" + session.getId());
        if (userId != null && roomId != null) {
            sessions.put(userId + "_" + roomId, session);
            loadInitialMessages(session, roomId, 0);
        } else {
            System.err.println("[확장] 연결 실패: userId 또는 roomId 누락");
            session.close(CloseStatus.BAD_DATA);
        }
    }

    // 기존 + [확장]: 로깅 강화 (이전 요청 반영)
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        System.out.println("[확장] 수신 메시지: " + payload);
        Map<String, Object> data = objectMapper.readValue(payload, Map.class);
        String type = (String) data.get("type");

        String userId = getUserId(session);
        String roomId = (String) data.get("roomId");

        if (type == null) {
            sendError(session, "메시지 타입 누락");
            return;
        }

        switch (type) {
            case "loadInitial":
            case "loadMore":
                int page = data.containsKey("page") ? (int) data.get("page") : 0;
                loadInitialMessages(session, roomId, page);
                break;
            default:
                saveAndBroadcastMessage(userId, roomId, data);
                break;
        }
    }

    // 기존
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String userId = getUserId(session);
        String roomId = getRoomId(session);
        System.out.println("[확장] 연결 종료: userId=" + userId + ", roomId=" + roomId + ", status=" + status);
        sessions.remove(userId + "_" + roomId);
    }

    // 기존
    public void sendReadReceipt(String roomId, String userId, Long messageId) throws Exception {
        Map<String, Object> readReceipt = new HashMap<>();
        readReceipt.put("type", "read");
        readReceipt.put("roomId", roomId);
        readReceipt.put("messageId", messageId);
        readReceipt.put("userId", userId);
        String jsonMessage = objectMapper.writeValueAsString(readReceipt);
        for (WebSocketSession session : sessions.values()) {
            if (session.isOpen() && roomId.equals(getRoomId(session))) {
                session.sendMessage(new TextMessage(jsonMessage));
                System.out.println("[확장] 읽음 알림 전송: roomId=" + roomId + ", messageId=" + messageId);
            }
        }
    }

    // 기존 + [확장]: DAO 사용
    private void loadInitialMessages(WebSocketSession session, String roomId, int page) throws Exception {
        int size = 20;
        List<Map<String, Object>> messages = chatDAO.getMessagesByRoomId(Long.parseLong(roomId), page, size);
        boolean hasMore = messages.size() == size;
        Map<String, Object> response = new HashMap<>();
        response.put("type", page == 0 ? "loadInitial" : "loadMore");
        response.put("messages", messages);
        response.put("hasMore", hasMore);
        session.sendMessage(new TextMessage(objectMapper.writeValueAsString(response)));
    }

    // 기존 + [확장]: 방송 로깅 추가 (이전 요청 반영)
    private void saveAndBroadcastMessage(String userId, String roomId, Map<String, Object> data) throws Exception {
        String content = (String) data.get("content");
        String imageUrls = (String) data.get("imageUrls");
        Long messageId = chatDAO.saveMessage(Long.parseLong(roomId), userId, content, imageUrls);
        Map<String, Object> message = new HashMap<>();
        message.put("messageId", messageId);
        message.put("roomId", roomId);
        message.put("senderId", userId);
        message.put("content", content);
        message.put("imageUrls", imageUrls);
        message.put("sentAt", new Date().toString());
        String jsonMessage = objectMapper.writeValueAsString(message);
        System.out.println("[확장] 브로드캐스트 메시지: " + jsonMessage);
        int sentCount = 0;
        for (WebSocketSession session : sessions.values()) {
            if (session.isOpen() && roomId.equals(getRoomId(session))) {
                try {
                    session.sendMessage(new TextMessage(jsonMessage));
                    sentCount++;
                    System.out.println("[확장] 메시지 전송 성공: sessionId=" + session.getId());
                } catch (Exception e) {
                    System.err.println("[확장] 메시지 전송 실패: sessionId=" + session.getId() + ", 오류=" + e.getMessage());
                }
            }
        }
        System.out.println("[확장] 총 전송 세션 수: " + sentCount);
    }

    // 기존
    private void sendError(WebSocketSession session, String errorMessage) throws Exception {
        Map<String, String> error = new HashMap<>();
        error.put("type", "error");
        error.put("message", errorMessage);
        session.sendMessage(new TextMessage(objectMapper.writeValueAsString(error)));
    }

    // 기존
    private String getUserId(WebSocketSession session) {
        return session.getUri().getQuery().split("&")[0].split("=")[1];
    }

    // 기존
    private String getRoomId(WebSocketSession session) {
        return session.getUri().getQuery().split("&")[1].split("=")[1];
    }
}