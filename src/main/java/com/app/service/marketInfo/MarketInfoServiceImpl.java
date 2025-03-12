package com.app.service.marketInfo;

import com.app.dao.marketInfo.MarketInfoDAO;
import com.app.dto.marketInfo.MarketInfoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarketInfoServiceImpl implements MarketInfoService {

    @Autowired
    private MarketInfoDAO marketInfoDAO;

    // 공공 API 데이터를 DB에 저장 (저장 개수 반환)
    @Override
    public int saveMarketInfo(List<MarketInfoDTO> marketInfoList) {
        if (marketInfoList == null || marketInfoList.isEmpty()) {
            return 0;  // 저장할 데이터 없음
        }

        return marketInfoDAO.insertMarketInfo(marketInfoList);
    }

    // 전체 도매가격 데이터 조회
    @Override
    public List<MarketInfoDTO> getMarketInfo() {
        return marketInfoDAO.selectAll();
    }

    // 특정 날짜의 도매가격 데이터 조회
    @Override
    public List<MarketInfoDTO> getMarketInfoByDate(String date) {
        return marketInfoDAO.selectByDate(date);
    }

    // 최신 도매가격 데이터 조회 (가장 최근 날짜)
    @Override
    public List<MarketInfoDTO> getLatestMarketInfo() {
        return marketInfoDAO.selectLatest();
    }
}
