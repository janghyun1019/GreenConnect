
package com.app.chatapp.dto;

import lombok.Data;

@Data
public class ChatRoomDTO {
	// 채팅방 고유 ID
    private Long roomId;
    // 첫 번째 사용자
    private String user1Id;
    // 두 번째 사용자
    private String user2Id;
    // 첫 번째 사용자의 상태 (ex: Y 활성 N 비활성) 
    private String user1Active;
    // 두 번째 사용자의 상태 (ex: Y 활성 N 비활성) 
    private String user2Active;
}