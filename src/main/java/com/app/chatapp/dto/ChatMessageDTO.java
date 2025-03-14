package com.app.chatapp.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class ChatMessageDTO {
    private Long messageId;      // 메시지 ID
    private Long roomId;         // 채팅방 ID
    private String senderId;     // 발신자 ID
    private String content;      // 메시지 내용
    private String imageUrls;    // 이미지 URL
    private Timestamp sentAt;    // 전송 시간

    // 생성자 추가
    public ChatMessageDTO(Long messageId, Long roomId, String senderId, String content, String imageUrls, Timestamp sentAt) {
        this.messageId = messageId;
        this.roomId = roomId;
        this.senderId = senderId;
        this.content = content;
        this.imageUrls = imageUrls;
        this.sentAt = sentAt;
    }
}