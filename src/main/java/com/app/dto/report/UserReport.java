package com.app.dto.report;

import lombok.Data;

@Data
public class UserReport {
	
	private String userId; // 신고하는 유저아이디
	private String reportedUserId; //신고당하는 유저아이디
	private String reportedUserNickName; // 신고당하는 유저닉네임
	private String reportedPostId; // 신고당하는 포스트아이디
	private String reportContent; // 신고사유
	private String reportResult; // 신고 결과

}
