package com.app.dao.marketInfo;

import com.app.dto.marketInfo.MarketInfoDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import java.util.List;

@Mapper // MyBatis 매퍼 등록
public interface MarketInfoDAO {
    int insertMarketInfo(List<MarketInfoDTO> marketInfoList);
    
    @Select("SELECT * FROM MARKET_INFO") // SQL 직접 사용 가능
    List<MarketInfoDTO> getMarketInfo();
    
    @Update("UPDATE MARKET_INFO SET AVG_PRICE = #{avgPrice}, MAX_PRICE = #{maxPrice}, MIN_PRICE = #{minPrice} WHERE ID = #{id}")
    int updateMarketInfo(@Param("marketInfo") MarketInfoDTO marketInfo);
}
