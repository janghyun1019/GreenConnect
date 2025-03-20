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
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Repository
public class ReportDAOImpl implements ReportDAO {

    private static final Logger logger = LogManager.getLogger(ReportDAOImpl.class);

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public List<UserReport> getAllUserReports() {
        try {
            return sqlSessionTemplate.selectList("Report_mapper.getAllUserReports");
        } catch (Exception e) {
            logger.error("Error fetching user reports: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public void updateReportResult(UserReport report) {
        try {
            sqlSessionTemplate.update("Report_mapper.updateReportResult", report);
        } catch (Exception e) {
            logger.error("Error updating report result: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public List<Report> getReportStats() {
        try {
            return sqlSessionTemplate.selectList("Report_mapper.getReportStats");
        } catch (Exception e) {
            logger.error("Error fetching report stats: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public List<Faq> getAllFaqs() {
        try {
            return sqlSessionTemplate.selectList("Report_mapper.getAllFaqs");
        } catch (Exception e) {
            logger.error("Error fetching FAQs: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public void insertFaq(Faq faq) {
        try {
            sqlSessionTemplate.insert("Report_mapper.insertFaq", faq);
        } catch (Exception e) {
            logger.error("Error inserting FAQ: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public void updatePostState(Post post) {
        try {
            sqlSessionTemplate.update("Report_mapper.updatePostState", post);
        } catch (Exception e) {
            logger.error("Error updating post state: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public List<UserReport> getAllUserReportsWithHistory() {
        try {
            return sqlSessionTemplate.selectList("Report_mapper.getAllUserReportsWithHistory");
        } catch (Exception e) {
            logger.error("Error fetching user reports with history: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

	@Override
	public int savePostReport(UserReport userReport) {
		int result = sqlSessionTemplate.insert("Report_mapper.savePostReport", userReport);
		
		return result;
	}
}