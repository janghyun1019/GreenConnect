package com.app.dao.report;

import java.util.List;

import com.app.dto.report.Report;
import com.app.dto.report.UserReport;

public interface ReportDAO {
	List<UserReport> getAllUserReports();
    void updateReportResult(UserReport report);
    List<Report> getReportStats();
    List<Faq> getAllFaqs();
    void insertFaq(Faq faq);
    void updatePostState(Post post);
    List<UserReport> getAllUserReportsWithHistory();
}
