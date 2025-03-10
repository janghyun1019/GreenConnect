package com.app.chatapp.handler;

import com.app.chatapp.service.ChatService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;
import java.util.Map;

public class ChatWebSocketHandler extends TextWebSocketHandler {
    private final Map<String, WebSocketSession> sessions = new HashMap<>(); // 사용자 세션 관리
    private final ChatService chatService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ChatWebSocketHandler(ChatService chatService) {
        this.chatService = chatService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String userId = session.getUri().getQuery().split("=")[1]; // URL에서 userId 추출
        sessions.put(userId, session);
        System.out.println(userId + " connected");
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        Map<String, String> data = objectMapper.readValue(payload, Map.class);
        Long roomId = Long.parseLong(data.get("roomId"));
        String senderId = session.getUri().getQuery().split("=")[1];
        String content = data.get("content");
        String imageUrls = data.get("imageUrls");

        // DB에 메시지 저장
        Long messageId = chatService.saveMessage(roomId, senderId, content, imageUrls);

        // 상대방 및 발신자에게 메시지 전송
        String targetUserId = chatService.getTargetUserId(roomId, senderId);
        WebSocketSession targetSession = sessions.get(targetUserId);
        if (targetSession != null && targetSession.isOpen()) {
            String response = objectMapper.writeValueAsString(Map.of(
                "messageId", messageId,
                "senderId", senderId,
                "content", content,
                "imageUrls", imageUrls,
                "sentAt", System.currentTimeMillis(),
                "read", "N"
            ));
            targetSession.sendMessage(new TextMessage(response));
            session.sendMessage(new TextMessage(response));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String userId = session.getUri().getQuery().split("=")[1];
        sessions.remove(userId);
        System.out.println(userId + " disconnected");
    }

    // 읽음 알림 전송
    public void sendReadReceipt(Long roomId, String userId, Long messageId) throws Exception {
        String targetUserId = chatService.getTargetUserId(roomId, userId);
        WebSocketSession targetSession = sessions.get(targetUserId);
        if (targetSession != null && targetSession.isOpen()) {
            String receipt = objectMapper.writeValueAsString(Map.of("type", "read", "messageId", messageId));
            targetSession.sendMessage(new TextMessage(receipt));
        }
    }
}