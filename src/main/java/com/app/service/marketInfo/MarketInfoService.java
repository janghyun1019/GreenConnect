package com.app.service.marketInfo;

import com.app.dto.marketInfo.MarketInfoDTO;
import java.util.List;

public interface MarketInfoService {
    List<MarketInfoDTO> getMarketInfo();
    List<MarketInfoDTO> getMarketInfoByDate(String date);
    List<MarketInfoDTO> getLatestMarketInfo();
}
