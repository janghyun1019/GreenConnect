package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.systemSetting.SystemSetting;
import com.app.service.systemSetting.SystemSettingService;

@RestController
@RequestMapping("/admin/system")
public class SystemSettingController {
	@Autowired
	SystemSettingService systemSettingService;
	@GetMapping("/membership")
    public SystemSetting getMembershipSettings() {
        return systemSettingService.getMembershipSettings();
    }

    @GetMapping("/design")
    public SystemSetting getSiteDesign() {
        return systemSettingService.getSiteDesign();
    }

    @GetMapping("/banners")
    public List<SystemSetting> getBanners() {
        return systemSettingService.getBanners();
    }

    @GetMapping("/server-status")
    public SystemSetting getServerStatus() {
        return systemSettingService.getServerStatus();
    }

    @GetMapping("/notices")
    public List<SystemSetting> getNotices() {
        return systemSettingService.getNotices();
    }

    @PostMapping("/notices")
    public SystemSetting addNotice(@RequestBody SystemSetting notice) {
        systemSettingService.addNotice(notice);
        return notice;
    }
	
}
