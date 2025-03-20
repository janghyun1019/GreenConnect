package com.app.service.report.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.report.ReportDAO;
import com.app.dto.faq.Faq;
import com.app.dto.post.Post;
import com.app.dto.report.Report;
import com.app.dto.report.UserReport;
import com.app.service.report.ReportService;
@Service
public class ReportServiceImpl implements ReportService{

	@Autowired
	ReportDAO reportDAO;
	
	@Override
	public List<UserReport> getAllUserReports() {
		List<UserReport> userReportList = reportDAO.getAllUserReports();
		return userReportList;
	}

	@Override
	public void updateReportResult(UserReport report) {
		reportDAO.updateReportResult(report);
		
	}

	@Override
	public List<Report> getReportStats() {
		List<Report> reportList = reportDAO.getReportStats();
		return reportList;
	}

	@Override
	public List<Faq> getAllFaqs() {
		List<Faq> faqList = reportDAO.getAllFaqs();
		return faqList;
	}

	@Override
	public void insertFaq(Faq faq) {
		reportDAO.insertFaq(faq);
	}

	@Override
	public void updatePostState(Post post) {
		reportDAO.updatePostState(post);
	}

	@Override
	public List<UserReport> getAllUserReportsWithHistory() {
		List<UserReport> userReportList = reportDAO.getAllUserReportsWithHistory();
		return userReportList;
	}
		@Override
	public int savePostReport(UserReport userReport) {
		int result = reportDAO.savePostReport(userReport);
		
		return result;
	}
	

}
