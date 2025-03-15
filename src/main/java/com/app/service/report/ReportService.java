package com.app.service.report;

import com.app.dto.report.Report;
import com.app.dto.report.UserReport;

public interface ReportService {
	
	int savePostReport(UserReport userReport);

}
