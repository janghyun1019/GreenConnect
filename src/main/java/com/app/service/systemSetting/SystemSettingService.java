package com.app.service.systemSetting;

import java.util.List;

import com.app.dto.systemSetting.SystemSetting;

public interface SystemSettingService {
	SystemSetting getMembershipSettings();
    SystemSetting getSiteDesign();
    List<SystemSetting> getBanners();
    SystemSetting getServerStatus();
    List<SystemSetting> getNotices();
    void addNotice(SystemSetting notice);
}
