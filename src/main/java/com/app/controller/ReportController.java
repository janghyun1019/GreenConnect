package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.faq.Faq;
import com.app.dto.post.Post;
import com.app.dto.report.Report;
import com.app.dto.report.UserReport;
import com.app.service.report.ReportService;

@RestController
@RequestMapping("/admin/CustomerSupport")
public class ReportController {
	@Autowired
	ReportService reportService;
	
	@GetMapping("/reports")
	public List<UserReport> getAllUserReports(){
		return reportService.getAllUserReports();
	}
	
	@PostMapping("/reports/update")
	public void updateReportResult(@RequestBody UserReport report) {
		reportService.updateReportResult(report);
	}
	
	@GetMapping("/stats")
	public List<Report> getReportStatus(){
		return reportService.getReportStats();
	}
	
	@GetMapping("/faqs")
	public List<Faq> getAllFaqs(){
		return reportService.getAllFaqs();
	}
	
	@PostMapping("/faqs")
	public void insertFaq(@RequestBody Faq faq) {
		reportService.insertFaq(faq);
	}
	@PostMapping("/posts/delete")
    public void updatePostState(@RequestBody Post post) {
        post.setPostState("N"); // 상태를 'N'으로 설정
        reportService.updatePostState(post);
    }
	@GetMapping("/reports/history")
	public List<UserReport> getAllUserReportsWithHistory() {
	    return reportService.getAllUserReportsWithHistory();
	}
}
