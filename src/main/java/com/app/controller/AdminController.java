package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.admin.Admin;
import com.app.service.admin.AdminService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private static final Logger logger = LogManager.getLogger(AdminController.class);

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<Admin> getDashboardData() {
        try {
            Admin dashboardData = adminService.fetchDashboardData();
            if (dashboardData == null) {
                logger.warn("No dashboard data available");
                return ResponseEntity.noContent().build();
            }
            logger.info("Dashboard data fetched successfully");
            return ResponseEntity.ok(dashboardData);
        } catch (Exception e) {
            logger.error("Error fetching dashboard data: " + e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }
}