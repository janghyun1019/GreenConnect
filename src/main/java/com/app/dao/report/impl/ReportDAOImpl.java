package com.app.dao.report.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.report.ReportDAO;
import com.app.dto.faq.Faq;
import com.app.dto.post.Post;
import com.app.dto.report.Report;
import com.app.dto.report.UserReport;
@Repository
public class ReportDAOImpl implements ReportDAO{
	
	@Autowired
    SqlSessionTemplate sqlSessiontemplate;
	
	@Override
	public List<UserReport> getAllUserReports() {
		List<UserReport> userReportList = sqlSessiontemplate.selectList("Report_mapper.getAllUserReports");
		return userReportList;
	}

	@Override
	public void updateReportResult(UserReport report) {
		sqlSessiontemplate.update("Report_mapper.updateReportResult",report);
	}

	@Override
	public List<Report> getReportStats() {
		List<Report> reportList = sqlSessiontemplate.selectList("Report_mapper.getReportStats");
		return reportList;
	}

	@Override
	public List<Faq> getAllFaqs() {
		List<Faq> faqList = sqlSessiontemplate.selectList("Report_mapper.getAllFaqs");
		return faqList;
	}

	@Override
	public void insertFaq(Faq faq) {
		sqlSessiontemplate.insert("Report_mapper.insertFaq",faq);
	}

	@Override
	public void updatePostState(Post post) {
		sqlSessiontemplate.update("Report_mapper.updatePostState",post);
		
	}

	@Override
	public List<UserReport> getAllUserReportsWithHistory() {
		List<UserReport> userReportList = sqlSessiontemplate.selectList("Report_mapper.getAllUserReportsWithHistory");
		return userReportList;
	}

}
