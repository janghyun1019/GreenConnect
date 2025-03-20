package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.app.dto.faq.Faq;
import com.app.dto.post.Post;
import com.app.dto.report.Report;
import com.app.dto.report.UserReport;
import com.app.service.report.ReportService;

@Controller
public class ReportController {
	@Autowired
	ReportService reportService;
	
	@GetMapping("/admin/CustomerSupport/reports")
	public List<UserReport> getAllUserReports(){
		return reportService.getAllUserReports();
	}
	
	@PostMapping("/admin/CustomerSupport/reports/update")
	public void updateReportResult(@RequestBody UserReport report) {
		reportService.updateReportResult(report);
	}
	
	@GetMapping("/admin/CustomerSupport/stats")
	public List<Report> getReportStatus(){
		return reportService.getReportStats();
	}
	
	@GetMapping("/admin/CustomerSupport/faqs")
	public List<Faq> getAllFaqs(){
		return reportService.getAllFaqs();
	}
	
	@PostMapping("/admin/CustomerSupport/faqs")
	public void insertFaq(@RequestBody Faq faq) {
		reportService.insertFaq(faq);
	}
	@PostMapping("/admin/CustomerSupport/posts/delete")
    public void updatePostState(@RequestBody Post post) {
        post.setPostState("N"); // 상태를 'N'으로 설정
        reportService.updatePostState(post);
    }
	@GetMapping("/admin/CustomerSupport/reports/history")
	public List<UserReport> getAllUserReportsWithHistory() {
	    return reportService.getAllUserReportsWithHistory();
	}
	@PostMapping("/api/postReport")
	ResponseEntity<?> savePostReport(@RequestBody UserReport userReport) {
		System.out.println("신고 들어옴");
		System.out.println(userReport);
		System.out.println("신고자: " + userReport.getUserId());
		System.out.println("신고사유: " + userReport.getReportContent());
		System.out.println("신고당한 판매글 postId: " + userReport.getReportedPostId());
		System.out.println("신고당한 유저 아이디" + userReport.getReportedUserId());
		System.out.println("신고당한 유저 닉네임" + userReport.getReportedUserNickName());
		
		int result = reportService.savePostReport(userReport);
		
		if (result > 0) {
            return ResponseEntity.ok("성공");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("실패");
        }
	}

}
