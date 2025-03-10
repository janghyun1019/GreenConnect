
package com.app.chatapp.controller;

import com.app.chatapp.dto.ChatRoomDTO;
import com.app.chatapp.handler.ChatWebSocketHandler;
import com.app.chatapp.service.ChatService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat") // 해당 컨트롤로의 기본 URL을 /aip/chat 으로 설정
public class ChatController {

	// 채팅 관련 비즈니스 로직 처리하는 서비스 클래스
	private final ChatService chatService;

	// WebSocket을 통한 실시간 채팅 기능을 처리하는 핸들러
	private final ChatWebSocketHandler webSocketHandler;

	/*
	 * 생성자를 통해 ChatService와 ChatWebSocketHandler를 주입받음
	 * 
	 * @param chatService      채팅 관련 비즈니스 로직을 처리하는 서비스 클래스
	 * @param webSocketHandler WebSocket을 이용한 실시간 채팅 기능을 담당하는 핸들러
	 */

	public ChatController(ChatService chatService, ChatWebSocketHandler webSocketHandler) {
		this.chatService = chatService;
		this.webSocketHandler = webSocketHandler;
	}

	// 사용자가 참여한 채팅방 목록을 조회함

	/*
	 * @param userId 조회할 사용자의 ID (URL 경로에서 전달됨)
	 * 
	 * @return 사용자가 참여한 채팅방 목록 (`List<ChatRoomDTO>` 형태로 반환)
	 */
	@GetMapping("/rooms/{userId}")
	public List<ChatRoomDTO> getChatRooms(@PathVariable String userId) {
		
		// chatService를 호출하여 userId가 참여한 채팅방 목록을 가져옴
		return chatService.getChatRooms(userId);
	}

	
	/*
	 * 메시지 읽음 처리 API
	 * 사용자가 특정 메시지를 읽었음을 서버에 알리고, 웹소켓을 통해 읽음 상태를 업데이트함.
	 * 
	 * @param data 클라이언트에서 전달한 JSON 데이터를 `Map<String, Object>`로 받음.
	 *             - "roomId": 읽음 처리를 할 메시지가 속한 채팅방 ID (Long)
	 *             - "messageId": 읽음 처리를 할 메시지 ID (Long)
	 *             - "userId": 메시지를 읽은 사용자 ID (String)
	 * @throws Exception 데이터 변환 오류 또는 서비스 처리 중 예외 발생 가능
	 */
	
	// 메시지 읽음 처리
	@PostMapping("/read")
	public void markAsRead(@RequestBody Map<String, Object> data) throws Exception {
		
		  // 요청 데이터에서 "roomId" 값을 가져와 Long 타입으로 변환
		Long roomId = Long.parseLong(data.get("roomId").toString());
		
		// 요청 데이터에서 "messageId" 값을 가져와 Long 타입으로 변환
		Long messageId = Long.parseLong(data.get("messageId").toString());
		
		// 요청 데이터에서 "userId" 값을 가져옴 (문자열)
		String userId = data.get("userId").toString();
	
		// 채팅 서비스에서 메시지를 읽음으로 처리 (DB에 업데이트)
		chatService.markMessageAsRead(messageId);
		
		// WebSocket을 통해 해당 메시지가 읽혔음을 다른 사용자들에게 알림
		webSocketHandler.sendReadReceipt(roomId, userId, messageId);
	}

	
	/*
	 * 사용자가 특정 채팅방에서 나가는 기능
	 * 
	 * @param roomId 나가려는 채팅방의 ID (Long)
	 * @param userId 채팅방을 떠나는 사용자 ID (String)
	 * 
	 * 이 메서드는 해당 사용자를 채팅방에서 제거하는 역할을 함.
	 * 데이터베이스에서 사용자의 채팅방 참여 정보를 삭제하고, 필요하면 관련된 추가 정리 작업을 수행할 수 있음.
	 */
	// 채팅방 나가기
	@PostMapping("/leave/{roomId}/{userId}")
	public void leaveChatRoom(@PathVariable Long roomId, @PathVariable String userId) {
		 // ChatService를 호출하여 사용자가 채팅방을 나가도록 처리
		chatService.leaveChatRoom(roomId, userId);
	}
}