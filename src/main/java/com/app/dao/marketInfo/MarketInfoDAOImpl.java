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
    public int insertMarketInfo(MarketInfoDTO marketInfo) {
        return sqlSession.insert("com.app.dao.marketInfo.MarketInfoDAO.insertMarketInfo", marketInfo);
    }

    @Override
    public List<MarketInfoDTO> getMarketInfo() {
        return sqlSession.selectList("com.app.dao.marketInfo.MarketInfoDAO.selectAll");
    }

	@Override
	public int insertMarketInfo(List<MarketInfoDTO> marketInfoList) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<MarketInfoDTO> selectByDate(String date) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<MarketInfoDTO> selectAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<MarketInfoDTO> selectLatest() {
		// TODO Auto-generated method stub
		return null;
	}
}
