package com.app.service.marketInfo;

import com.app.dao.marketInfo.MarketInfoDAO;
import com.app.dto.marketInfo.MarketInfoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service // Spring 서비스 등록
public class MarketInfoServiceImpl implements MarketInfoService {

    @Autowired // ✅ MarketInfoDAO 자동 주입
    private MarketInfoDAO marketInfoDAO;

    // 공공 API 데이터를 DB에 저장하고 저장된 개수(int)를 반환하는 메서드
    @Override
    public int saveMarketInfo(List<MarketInfoDTO> marketInfoList) {
        if (marketInfoList == null || marketInfoList.isEmpty()) {
            return 0;  // 저장할 데이터가 없으면 0 반환
        }

        marketInfoDAO.insertMarketInfo(marketInfoList);
        return marketInfoList.size();  // 저장된 개수를 반환
    }

    // 저장된 도매가격 데이터를 조회하는 메서드
    @Override
    public List<MarketInfoDTO> getMarketInfo() {
        return marketInfoDAO.getMarketInfo();
    }
}
