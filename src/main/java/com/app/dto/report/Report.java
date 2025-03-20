package com.app.dto.report;

import lombok.Data;

@Data
public class Report {
	int reportId;
    String reportedUserId;
    int reportCount;
    String reportPunish;
	
	private String reportId;
	private String reportCount; //신고누적횟수
	private String reportPunish; //신고누적시 처벌

}
