package com.app.dao.marketInfo;

import com.app.dto.marketInfo.MarketInfoDTO;
import java.util.List;

public interface MarketInfoDAO {
    int insertMarketInfo(List<MarketInfoDTO> marketInfoList);
    List<MarketInfoDTO> getMarketInfo();
}
