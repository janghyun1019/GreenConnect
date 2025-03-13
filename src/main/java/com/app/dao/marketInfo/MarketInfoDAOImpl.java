package com.app.dao.marketInfo;

import com.app.dto.marketInfo.MarketInfoDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class MarketInfoDAOImpl implements MarketInfoDAO {

    private final SqlSession sqlSession;

    public MarketInfoDAOImpl(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    @Override
    public List<MarketInfoDTO> getMarketInfo() {
        return sqlSession.selectList("com.app.dao.marketInfo.MarketInfoDAO.getMarketInfo");  // ✅ 정확한 SQL 매핑 경로 사용
    }

    @Override
    public List<MarketInfoDTO> selectByDate(String date) {
        return sqlSession.selectList("com.app.dao.marketInfo.MarketInfoDAO.selectByDate", date);
    }

    @Override
    public List<MarketInfoDTO> selectLatest() {
        return sqlSession.selectList("com.app.dao.marketInfo.MarketInfoDAO.selectLatest");
    }
}
