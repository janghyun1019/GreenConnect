package com.app.service.marketInfo;

import java.util.List;
import com.app.dto.marketInfo.MarketInfoDTO;

public interface MarketInfoService {
    // 공공데이터 API -> DB 저장
    int fetchAndSaveMarketData(String date);

    // DB 조회
    List<MarketInfoDTO> getAllData();
}
