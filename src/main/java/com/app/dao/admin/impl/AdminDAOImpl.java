package com.app.dao.admin.impl;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.admin.AdminDAO;
import com.app.dto.admin.Admin;
@Repository
public class AdminDAOImpl implements AdminDAO{

	@Autowired
	SqlSessionTemplate sqlSessionTemplate;

	@Override
	public Admin fetchDashboardData() {
		return sqlSessionTemplate.selectOne("Admin_mapper.getAdminDashboardData");
	}

}
