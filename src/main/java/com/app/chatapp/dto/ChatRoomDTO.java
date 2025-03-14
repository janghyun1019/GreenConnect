package com.app.chatapp.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class ChatRoomDTO {
    private Long roomId;
    private String user1Id;
    private String user2Id;
    private String user1Active;
    private String user2Active;
    private Timestamp createdAt;
    private Long messageId; // 최근 메시지 ID (NULL 가능성이 있음에 주의)
}