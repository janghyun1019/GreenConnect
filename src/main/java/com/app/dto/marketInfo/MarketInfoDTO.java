package com.app.dto.marketInfo;

public class MarketInfoDTO {
    private int id;
    private String getDate;   // 거래 날짜
    private String pumNm;     // 품목명
    private String gName;     // 등급
    private int avP;          // 평균 가격
    private int miP;          // 최저 가격
    private int maP;          // 최고 가격
    private String sPosGubun; // 시장명
    
    // Getters & Setters
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getGetDate() {
		return getDate;
	}
	public void setGetDate(String getDate) {
		this.getDate = getDate;
	}
	public String getPumNm() {
		return pumNm;
	}
	public void setPumNm(String pumNm) {
		this.pumNm = pumNm;
	}
	public String getgName() {
		return gName;
	}
	public void setgName(String gName) {
		this.gName = gName;
	}
	public int getAvP() {
		return avP;
	}
	public void setAvP(int avP) {
		this.avP = avP;
	}
	public int getMiP() {
		return miP;
	}
	public void setMiP(int miP) {
		this.miP = miP;
	}
	public int getMaP() {
		return maP;
	}
	public void setMaP(int maP) {
		this.maP = maP;
	}
	public String getsPosGubun() {
		return sPosGubun;
	}
	public void setsPosGubun(String sPosGubun) {
		this.sPosGubun = sPosGubun;
	}
	public String getGName() {
		// TODO Auto-generated method stub
		return null;
	}
	public String getSPosGubun() {
		// TODO Auto-generated method stub
		return null;
	}
	public void setGName(String string) {
		// TODO Auto-generated method stub
		
	}
	public void setSPosGubun(String string) {
		// TODO Auto-generated method stub
		
	}


    
    
}
