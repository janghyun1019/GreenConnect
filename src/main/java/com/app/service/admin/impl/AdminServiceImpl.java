package com.app.service.admin.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.admin.AdminDAO;
import com.app.dto.admin.Admin;
import com.app.service.admin.AdminService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Service
public class AdminServiceImpl implements AdminService {
    private static final Logger logger = LogManager.getLogger(AdminServiceImpl.class);

    @Autowired
    private AdminDAO adminDAO;

    @Override
    public Admin fetchDashboardData() {
        try {
            Admin data = adminDAO.fetchDashboardData();
            if (data == null) {
                logger.warn("No data returned from DAO");
                return new Admin(); // 기본값 반환
            }
            return data;
        } catch (Exception e) {
            logger.error("Error fetching dashboard data: " + e.getMessage());
            throw new RuntimeException("Failed to fetch dashboard data", e);
        }
    }
}