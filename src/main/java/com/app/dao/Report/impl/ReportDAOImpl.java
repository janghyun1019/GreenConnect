package com.app.dao.Report.impl;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.Report.ReportDAO;
import com.app.dto.report.Report;
import com.app.dto.report.UserReport;

@Repository
public class ReportDAOImpl implements ReportDAO {
	
	@Autowired
	SqlSessionTemplate sqlSessionTemplate;

	@Override
	public int savePostReport(UserReport userReport) {
		int result = sqlSessionTemplate.insert("report_mapper.savePostReport", userReport);
				
		return result;
	}
	
	

}
