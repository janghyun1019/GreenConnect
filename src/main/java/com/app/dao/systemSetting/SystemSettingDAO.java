package com.app.dao.systemSetting;

import java.util.List;

import com.app.dto.systemSetting.SystemSetting;

public interface SystemSettingDAO {
	SystemSetting getMembershipSettings();
    SystemSetting getSiteDesign();
    List<SystemSetting> getBanners();
    SystemSetting getServerStatus();
    List<SystemSetting> getNotices();
    int addNotice(SystemSetting notice);
}
