package com.app.dao.marketInfo;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.app.dto.marketInfo.MarketInfoDTO;

@Mapper // MyBatis 매퍼로 등록
public interface MarketInfoDAO {
    int insertMarketInfo(MarketInfoDTO dto);
    MarketInfoDTO selectById(Long id);
    List<MarketInfoDTO> selectByCondition(MarketInfoDTO dto);
    List<MarketInfoDTO> selectAll();
    int updateMarketInfo(MarketInfoDTO dto);
    int deleteMarketInfo(Long id);
}
