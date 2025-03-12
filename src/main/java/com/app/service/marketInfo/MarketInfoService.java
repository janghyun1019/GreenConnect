package com.app.service.marketInfo;

import com.app.dto.marketInfo.MarketInfoDTO;
import java.util.List;

public interface MarketInfoService {
    int saveMarketInfo(List<MarketInfoDTO> marketInfoList);  // DB 저장 후 저장된 개수 반환
    List<MarketInfoDTO> getMarketInfo();  // 저장된 도매가격 데이터 조회
}
