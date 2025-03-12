package com.app.dao.marketInfo;

import com.app.dto.marketInfo.MarketInfoDTO;
import com.app.utill.DBConnectionManager;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class MarketInfoDAOImpl implements MarketInfoDAO {

    @Override
    public int insertMarketInfo(List<MarketInfoDTO> marketInfoList) {
        Connection conn = null;
        PreparedStatement psmt = null;
        boolean isSuccess = false;
        int insertCount = 0;

        String sqlQuery = "INSERT INTO MARKET_INFO (ID, GETDATE, PUM_NM, G_NAME, AV_P, MI_P, MA_P, S_POS_GUBUN) " +
                          "VALUES (MARKET_INFO_SEQ.NEXTVAL, ?, ?, ?, ?, ?, ?, ?)";

        try {
            conn = DBConnectionManager.connectDB();
            psmt = conn.prepareStatement(sqlQuery);

            for (MarketInfoDTO info : marketInfoList) {
                psmt.setString(1, info.getGetDate());
                psmt.setString(2, info.getPumNm());
                psmt.setString(3, info.getGName());
                psmt.setInt(4, info.getAvP());
                psmt.setInt(5, info.getMiP());
                psmt.setInt(6, info.getMaP());
                psmt.setString(7, info.getSPosGubun());

                insertCount += psmt.executeUpdate();
            }

            isSuccess = true;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBConnectionManager.disconnectDB(conn, psmt, null, isSuccess);
        }

        return insertCount;
    }

    @Override
    public List<MarketInfoDTO> getMarketInfo() {
        Connection conn = null;
        PreparedStatement psmt = null;
        ResultSet rs = null;
        List<MarketInfoDTO> marketInfoList = new java.util.ArrayList<>();

        String sqlQuery = "SELECT * FROM MARKET_INFO ORDER BY GETDATE DESC";

        try {
            conn = DBConnectionManager.connectDB();
            psmt = conn.prepareStatement(sqlQuery);
            rs = psmt.executeQuery();

            while (rs.next()) {
                MarketInfoDTO dto = new MarketInfoDTO();
                dto.setId(rs.getInt("ID"));
                dto.setGetDate(rs.getString("GETDATE"));
                dto.setPumNm(rs.getString("PUM_NM"));
                dto.setGName(rs.getString("G_NAME"));
                dto.setAvP(rs.getInt("AV_P"));
                dto.setMiP(rs.getInt("MI_P"));
                dto.setMaP(rs.getInt("MA_P"));
                dto.setSPosGubun(rs.getString("S_POS_GUBUN"));

                marketInfoList.add(dto);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBConnectionManager.disconnectDB(conn, psmt, rs, true);
        }

        return marketInfoList;
    }
}
