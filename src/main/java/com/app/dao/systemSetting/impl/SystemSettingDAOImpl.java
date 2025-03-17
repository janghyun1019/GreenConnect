package com.app.dao.systemSetting.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.systemSetting.SystemSettingDAO;
import com.app.dto.systemSetting.SystemSetting;
@Repository
public class SystemSettingDAOImpl implements SystemSettingDAO{
	
	@Autowired
    private SqlSessionTemplate sqlSessionTemplate;
	
	@Override
	public SystemSetting getMembershipSettings() {
		return sqlSessionTemplate.selectOne("systemSetting_mapper.getMembershipSettings");
	}

	@Override
	public SystemSetting getSiteDesign() {
		return sqlSessionTemplate.selectOne("systemSetting_mapper.getSiteDesign");
	}

	@Override
	public List<SystemSetting> getBanners() {
		List<SystemSetting> SettingList = sqlSessionTemplate.selectList("systemSetting_mapper.getBanners");
		return SettingList;
	}

	@Override
	public SystemSetting getServerStatus() {
		return sqlSessionTemplate.selectOne("systemSetting_mapper.getServerStatus");
	}

	@Override
	public List<SystemSetting> getNotices() {
		List<SystemSetting> SettingList = sqlSessionTemplate.selectList("systemSetting_mapper.getNotices");
		return SettingList;
	}

	@Override
	public int addNotice(SystemSetting notice) {
		int result = sqlSessionTemplate.insert("systemSetting_mapper.addNotice",notice);
		return result;
	}
	
}
