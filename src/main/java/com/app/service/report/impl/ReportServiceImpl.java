package com.app.service.report.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.Report.ReportDAO;
import com.app.dto.report.Report;
import com.app.dto.report.UserReport;
import com.app.service.report.ReportService;

@Service
public class ReportServiceImpl implements ReportService {
	
	@Autowired
	ReportDAO reportDAO;

	@Override
	public int savePostReport(UserReport userReport) {
		int result = reportDAO.savePostReport(userReport);
		
		return result;
	}
	
	

}
