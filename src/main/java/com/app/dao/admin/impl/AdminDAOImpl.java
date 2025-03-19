package com.app.dao.admin.impl;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.admin.AdminDAO;
import com.app.dto.admin.Admin;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Repository
public class AdminDAOImpl implements AdminDAO {

    private static final Logger logger = LogManager.getLogger(AdminDAOImpl.class);

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public Admin fetchDashboardData() {
        try {
            Admin data = sqlSessionTemplate.selectOne("Admin_mapper.getAdminDashboardData");
            if (data == null) {
                logger.warn("No dashboard data found in database");
                return new Admin();
            }
            return data;
        } catch (Exception e) {
            logger.error("Error executing SQL query: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }
}