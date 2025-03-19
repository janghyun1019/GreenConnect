package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.systemSetting.SystemSetting;
import com.app.service.systemSetting.SystemSettingService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@RestController
@RequestMapping("/admin/system")
public class SystemSettingController {
    private static final Logger logger = LogManager.getLogger(SystemSettingController.class);

    @Autowired
    private SystemSettingService systemSettingService;

    @GetMapping("/membership")
    public ResponseEntity<SystemSetting> getMembershipSettings() {
        try {
            SystemSetting data = systemSettingService.getMembershipSettings();
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            logger.error("Error fetching membership settings: " + e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/design")
    public ResponseEntity<SystemSetting> getSiteDesign() {
        try {
            SystemSetting data = systemSettingService.getSiteDesign();
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            logger.error("Error fetching site design: " + e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/banners")
    public ResponseEntity<List<SystemSetting>> getBanners() {
        try {
            List<SystemSetting> data = systemSettingService.getBanners();
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            logger.error("Error fetching banners: " + e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/server-status")
    public ResponseEntity<SystemSetting> getServerStatus() {
        try {
            SystemSetting data = systemSettingService.getServerStatus();
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            logger.error("Error fetching server status: " + e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/notices")
    public ResponseEntity<List<SystemSetting>> getNotices() {
        try {
            List<SystemSetting> data = systemSettingService.getNotices();
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            logger.error("Error fetching notices: " + e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/notices")
    public ResponseEntity<SystemSetting> addNotice(@RequestBody SystemSetting notice) {
        try {
            systemSettingService.addNotice(notice);
            notice.setNoticeId(notice.getNoticeId()); // selectKey로 설정된 값 반영
            return ResponseEntity.ok(notice);
        } catch (Exception e) {
            logger.error("Error adding notice: " + e.getMessage());
            return ResponseEntity.status(400).body(null);
        }
    }
}