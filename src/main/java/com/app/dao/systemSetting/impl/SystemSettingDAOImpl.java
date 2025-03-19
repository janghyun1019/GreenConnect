package com.app.dao.systemSetting.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.systemSetting.SystemSettingDAO;
import com.app.dto.systemSetting.SystemSetting;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Repository
public class SystemSettingDAOImpl implements SystemSettingDAO {

    private static final Logger logger = LogManager.getLogger(SystemSettingDAOImpl.class);

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public SystemSetting getMembershipSettings() {
        try {
            return sqlSessionTemplate.selectOne("systemSetting_mapper.getMembershipSettings");
        } catch (Exception e) {
            logger.error("Error fetching membership settings: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public SystemSetting getSiteDesign() {
        try {
            return sqlSessionTemplate.selectOne("systemSetting_mapper.getSiteDesign");
        } catch (Exception e) {
            logger.error("Error fetching site design: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public List<SystemSetting> getBanners() {
        try {
            return sqlSessionTemplate.selectList("systemSetting_mapper.getBanners");
        } catch (Exception e) {
            logger.error("Error fetching banners: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public SystemSetting getServerStatus() {
        try {
            return sqlSessionTemplate.selectOne("systemSetting_mapper.getServerStatus");
        } catch (Exception e) {
            logger.error("Error fetching server status: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public List<SystemSetting> getNotices() {
        try {
            return sqlSessionTemplate.selectList("systemSetting_mapper.getNotices");
        } catch (Exception e) {
            logger.error("Error fetching notices: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }

    @Override
    public int addNotice(SystemSetting notice) {
        try {
            return sqlSessionTemplate.insert("systemSetting_mapper.addNotice", notice);
        } catch (Exception e) {
            logger.error("Error adding notice: " + e.getMessage());
            throw new RuntimeException("Database error", e);
        }
    }
}