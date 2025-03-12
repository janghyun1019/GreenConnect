package com.app.dao.marketInfo;

import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import com.app.dto.marketInfo.MarketInfoDTO;

@Repository
public class MarketInfoDAOImpl implements MarketInfoDAO {

    private final JdbcTemplate jdbcTemplate;

    // ✅ JdbcTemplate을 생성자 주입
    public MarketInfoDAOImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<MarketInfoDTO> rowMapper = (rs, rowNum) -> new MarketInfoDTO(
        rs.getLong("id"),
        rs.getString("marketName"),
        rs.getString("location"),
        rs.getString("category"),
        rs.getTimestamp("createdAt").toLocalDateTime()
    );

    @Override
    public int insertMarketInfo(MarketInfoDTO dto) {
        String sql = "INSERT INTO MARKET_INFO (marketName, location, category, createdAt) VALUES (?, ?, ?, NOW())";
        return jdbcTemplate.update(sql, dto.getMarketName(), dto.getLocation(), dto.getCategory());
    }

    @Override
    public MarketInfoDTO selectById(Long id) {
        String sql = "SELECT * FROM MARKET_INFO WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, rowMapper, id);
    }

    @Override
    public List<MarketInfoDTO> selectByCondition(MarketInfoDTO dto) {
        String sql = "SELECT * FROM MARKET_INFO WHERE category = ?";
        return jdbcTemplate.query(sql, rowMapper, dto.getCategory());
    }

    @Override
    public List<MarketInfoDTO> selectAll() {
        String sql = "SELECT * FROM MARKET_INFO ORDER BY createdAt DESC";
        return jdbcTemplate.query(sql, rowMapper);
    }

    @Override
    public int updateMarketInfo(MarketInfoDTO dto) {
        String sql = "UPDATE MARKET_INFO SET marketName = ?, location = ?, category = ? WHERE id = ?";
        return jdbcTemplate.update(sql, dto.getMarketName(), dto.getLocation(), dto.getCategory(), dto.getId());
    }

    @Override
    public int deleteMarketInfo(Long id) {
        String sql = "DELETE FROM MARKET_INFO WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
