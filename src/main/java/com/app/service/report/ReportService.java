package com.app.service.report;

<<<<<<< HEAD
import java.util.List;

import com.app.dto.faq.Faq;
import com.app.dto.post.Post;
=======
>>>>>>> pcj-detail-payment
import com.app.dto.report.Report;
import com.app.dto.report.UserReport;

public interface ReportService {
	List<UserReport> getAllUserReports();
    void updateReportResult(UserReport  report);
    List<Report> getReportStats();
    List<Faq> getAllFaqs();
    void insertFaq(Faq faq);
    void updatePostState(Post post);
    List<UserReport> getAllUserReportsWithHistory();
	
	int savePostReport(UserReport userReport);

}
