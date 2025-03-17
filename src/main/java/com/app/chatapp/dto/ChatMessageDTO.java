package com.app.chatapp.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class ChatMessageDTO {
    private Long messageId;
    private Long roomId;
    private String senderId;
    private String content;
    private String imageUrls; // JSON 문자열로 유지
    private Timestamp sentAt;

    // 기존: 기본 생성자
    public ChatMessageDTO(Long messageId, Long roomId, String senderId, String content, String imageUrls, Timestamp sentAt) {
        this.messageId = messageId;
        this.roomId = roomId;
        this.senderId = senderId;
        this.content = content;
        this.imageUrls = imageUrls;
        this.sentAt = sentAt;
    }

    // [확장] 기본 생성자 추가
    public ChatMessageDTO() {}
}