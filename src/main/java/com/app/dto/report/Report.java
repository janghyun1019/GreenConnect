package com.app.dto.report;

import lombok.Data;

@Data
public class Report {
	int reportId;
    String reportedUserId;
    int reportCount;
    String reportPunish;
}
