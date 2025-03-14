package com.app.chatapp.handler;

import com.app.chatapp.dto.ChatMessageDTO;
import com.app.chatapp.service.ChatService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.sql.Clob;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final ChatService chatService;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private static final int DEFAULT_PAGE_SIZE = 50;

    @Autowired
    public ChatWebSocketHandler(ChatService chatService) {
        this.chatService = chatService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        session.setTextMessageSizeLimit(1024 * 1024);
        String[] queryParams = session.getUri().getQuery().split("&");
        String userId = queryParams[0].split("=")[1];
        Long roomId = Long.parseLong(queryParams[1].split("=")[1]);

        sessions.put(userId, session);
        System.out.println("세션 추가: " + userId + " in room " + roomId);
        sendMessages(session, roomId, 0, "loadInitial");
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        try {
            Map<String, Object> data = objectMapper.readValue(message.getPayload(), Map.class);
            String senderId = session.getUri().getQuery().split("&")[0].split("=")[1];
            String type = (String) data.get("type");

            Long roomId = Long.parseLong(data.get("roomId").toString());
            if ("loadInitial".equals(type) || "loadMore".equals(type)) {
                int page = Integer.parseInt(data.get("page").toString());
                sendMessages(session, roomId, page, type);
                return;
            } else if ("read".equals(type)) {
                Long messageId = Long.parseLong(data.get("messageId").toString());
                chatService.markMessageAsRead(messageId);
                sendReadReceipt(roomId, senderId, messageId);
                return;
            }

            String content = (String) data.get("content");
            String imageUrls = (String) data.get("imageUrls");
            System.out.println("Received: roomId=" + roomId + ", senderId=" + senderId + ", content=" + content + ", imageUrls=" + imageUrls);
            Long messageId = chatService.saveMessage(roomId, senderId, content, imageUrls);

            ChatMessageDTO messageData = new ChatMessageDTO(messageId, roomId, senderId, content, imageUrls, new Timestamp(System.currentTimeMillis()));
            String targetUserId = chatService.getTargetUserId(roomId, senderId);
            broadcast(messageData, session, sessions.get(targetUserId));
        } catch (Exception e) {
            System.err.println("메시지 처리 오류: " + e.getMessage());
            e.printStackTrace();
            if (session.isOpen()) {
                session.sendMessage(new TextMessage("{\"type\":\"error\",\"message\":\"" + e.getMessage() + "\"}"));
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String userId = session.getUri().getQuery().split("&")[0].split("=")[1];
        sessions.remove(userId);
        System.out.println("세션 제거: " + userId + ", 상태: " + status);
        if (status.getCode() != CloseStatus.NORMAL.getCode()) {
            System.out.println("비정상 종료 감지: " + status);
        }
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        System.err.println("전송 에러: userId=" + session.getUri().getQuery().split("&")[0].split("=")[1] + ", 오류=" + exception.getMessage());
        exception.printStackTrace();
        if (session.isOpen()) {
            session.close(CloseStatus.SERVER_ERROR.withReason("서버 오류 발생"));
        }
    }

    private void sendMessages(WebSocketSession session, Long roomId, int page, String type) throws Exception {
        int pageSize = DEFAULT_PAGE_SIZE;
        List<?> rawMessages = chatService.getMessagesByRoomId(roomId, page, pageSize);
        List<ChatMessageDTO> messages = rawMessages == null ? Collections.emptyList() :
            rawMessages.stream().map(msg -> {
                try {
                    if (msg instanceof Map) {
                        Map<String, Object> m = (Map<String, Object>) msg;
                        String content = m.get("CONTENT") instanceof Clob ?
                            clobToString((Clob) m.get("CONTENT")) : (String) m.get("CONTENT");
                        Object sentAtObj = m.get("SENT_AT");
                        Timestamp sentAt;
                        if (sentAtObj instanceof Timestamp) {
                            sentAt = (Timestamp) sentAtObj;
                        } else if (sentAtObj instanceof Number) {
                            sentAt = new Timestamp(((Number) sentAtObj).longValue());
                        } else {
                            sentAt = new Timestamp(System.currentTimeMillis()); // 기본값
                            System.err.println("[서버] SENT_AT 타입 알 수 없음: " + sentAtObj.getClass());
                        }
                        return new ChatMessageDTO(
                            ((Number) m.get("MESSAGE_ID")).longValue(),
                            Long.parseLong(m.get("ROOM_ID").toString()),
                            (String) m.get("SENDER_ID"),
                            content,
                            (String) m.get("IMAGE_URLS"),
                            sentAt
                        );
                    }
                    return null; // 실제 엔티티가 있다면 주석 참고
                } catch (Exception e) {
                    System.err.println("[서버] 메시지 변환 오류: " + e.getMessage());
                    return null;
                }
            }).filter(m -> m != null).collect(Collectors.toList());

        boolean hasMore = messages.size() == pageSize;
        Map<String, Object> response = new HashMap<>();
        response.put("type", type);
        response.put("messages", messages);
        response.put("hasMore", hasMore);

        if (session.isOpen()) {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(response)));
            System.out.println("메시지 전송 완료: " + type + " for room " + roomId);
        }
    }

    private String clobToString(Clob clob) throws Exception {
        if (clob == null) return null;
        return clob.getSubString(1, (int) clob.length());
    }

    private void broadcast(ChatMessageDTO messageData, WebSocketSession sender, WebSocketSession target) throws Exception {
        String json = objectMapper.writeValueAsString(messageData);
        if (sender.isOpen()) {
            sender.sendMessage(new TextMessage(json));
            System.out.println("발신자 전송: " + messageData.getSenderId());
        }
        if (target != null && target.isOpen()) {
            target.sendMessage(new TextMessage(json));
            System.out.println("수신자 전송: " + messageData.getSenderId());
        }
    }

    public void sendReadReceipt(Long roomId, String userId, Long messageId) throws Exception {
        Map<String, Object> receipt = new HashMap<>();
        receipt.put("type", "read");
        receipt.put("roomId", roomId);
        receipt.put("messageId", messageId);
        String json = objectMapper.writeValueAsString(receipt);
        WebSocketSession targetSession = sessions.get(chatService.getTargetUserId(roomId, userId));
        if (targetSession != null && targetSession.isOpen()) {
            targetSession.sendMessage(new TextMessage(json));
        }
    }
}