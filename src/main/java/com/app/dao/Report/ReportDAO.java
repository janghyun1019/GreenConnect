package com.app.dao.Report;

import com.app.dto.report.Report;
import com.app.dto.report.UserReport;

public interface ReportDAO {
	
	int savePostReport(UserReport userReport);

}
