package com.app.dto.marketInfo;

import java.time.LocalDateTime;

public class MarketInfoDTO {
    private String itemName;   // 품목명
    private String marketName; // 도매시장명
    private String grade;      // 등급
    private String unit;       // 단위
    private int avgPrice;      // 평균가
    private int maxPrice;      // 최고가
    private int minPrice;      // 최저가

    public MarketInfoDTO(long long1, String string, String string2, String string3, LocalDateTime localDateTime) {
		// TODO Auto-generated constructor stub
	}
	// getter / setter
    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public String getMarketName() { return marketName; }
    public void setMarketName(String marketName) { this.marketName = marketName; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public int getAvgPrice() { return avgPrice; }
    public void setAvgPrice(int avgPrice) { this.avgPrice = avgPrice; }

    public int getMaxPrice() { return maxPrice; }
    public void setMaxPrice(int maxPrice) { this.maxPrice = maxPrice; }

    public int getMinPrice() { return minPrice; }
    public void setMinPrice(int minPrice) { this.minPrice = minPrice; }

    @Override
    public String toString() {
        return "MarketInfoDTO [itemName=" + itemName 
            + ", marketName=" + marketName
            + ", grade=" + grade
            + ", unit=" + unit
            + ", avgPrice=" + avgPrice
            + ", maxPrice=" + maxPrice
            + ", minPrice=" + minPrice + "]";
    }
	public Object getLocation() {
		// TODO Auto-generated method stub
		return null;
	}
	public Object getCategory() {
		// TODO Auto-generated method stub
		return null;
	}
	public Object getId() {
		// TODO Auto-generated method stub
		return null;
	}
}
