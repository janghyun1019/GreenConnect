package com.app.dto.systemSetting;

import lombok.Data;

@Data
public class SystemSetting {
	// 멤버쉽 및 정책 설정 DTO
    String policy;
    // 사이트 디자인 DTO
    String theme;
    // 배너 관리 DTO
    long bannerId;
    String bannerTitle;
    // 서버 상태 DTO
    String status;
    // 공지사항 DTO
    long noticeId;
    String noticeTitle;
    String noticeContent;
}
