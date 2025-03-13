package com.app.service.marketInfo;

import com.app.dao.marketInfo.MarketInfoDAO;
import com.app.dto.marketInfo.MarketInfoDTO;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MarketInfoServiceImpl implements MarketInfoService {

    private final MarketInfoDAO marketInfoDAO;

    public MarketInfoServiceImpl(MarketInfoDAO marketInfoDAO) {
        this.marketInfoDAO = marketInfoDAO;
    }

    @Override
    public List<MarketInfoDTO> getMarketInfo() {
        return marketInfoDAO.getMarketInfo();
    }

    @Override
    public List<MarketInfoDTO> getMarketInfoByDate(String date) {
        return marketInfoDAO.selectByDate(date);
    }

    @Override
    public List<MarketInfoDTO> getLatestMarketInfo() {
        return marketInfoDAO.selectLatest();
    }
}
