package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.app.dto.report.Report;
import com.app.dto.report.UserReport;
import com.app.service.report.ReportService;



@Controller
public class ReportController {
	
	@Autowired
	ReportService reportService;
	
	
	@PostMapping("/api/postReport")
	ResponseEntity<?> savePostReport(@RequestBody UserReport userReport) {
		
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