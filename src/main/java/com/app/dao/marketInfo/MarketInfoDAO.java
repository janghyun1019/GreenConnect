package com.app.dao.marketInfo;

import java.util.List;
import com.app.dto.marketInfo.MarketInfoDTO;

public interface MarketInfoDAO {
    // 단일 저장
    int insertMarketInfo(MarketInfoDTO dto);

    // 전체 조회
    List<MarketInfoDTO> selectAll();
}
