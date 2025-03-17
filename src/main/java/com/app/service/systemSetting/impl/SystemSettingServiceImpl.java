package com.app.service.systemSetting.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.systemSetting.SystemSettingDAO;
import com.app.dto.systemSetting.SystemSetting;
import com.app.service.systemSetting.SystemSettingService;
@Service
public class SystemSettingServiceImpl implements SystemSettingService{

	@Autowired
	SystemSettingDAO systemSettingDAO;
	
	@Override
	public SystemSetting getMembershipSettings() {
		return systemSettingDAO.getMembershipSettings();
	}

	@Override
	public SystemSetting getSiteDesign() {
		return systemSettingDAO.getSiteDesign();
	}

	@Override
	public List<SystemSetting> getBanners() {
		return systemSettingDAO.getBanners();
	}

	@Override
	public SystemSetting getServerStatus() {
		return systemSettingDAO.getServerStatus();
	}

	@Override
	public List<SystemSetting> getNotices() {
		return systemSettingDAO.getNotices();
	}

	@Override
	public void addNotice(SystemSetting notice) {
		systemSettingDAO.addNotice(notice);
		
	}

}
