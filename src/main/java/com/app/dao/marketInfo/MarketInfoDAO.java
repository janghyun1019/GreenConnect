package com.app.dao.marketInfo;

import com.app.dto.marketInfo.MarketInfoDTO;
import java.util.List;

public interface MarketInfoDAO {
    List<MarketInfoDTO> getMarketInfo();  // MyBatis XML과 동일한 메서드명 사용
    List<MarketInfoDTO> selectByDate(String date);
    List<MarketInfoDTO> selectLatest();
}
