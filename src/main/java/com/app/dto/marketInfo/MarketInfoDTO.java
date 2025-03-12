package com.app.dto.marketInfo;

import java.sql.Timestamp;

public class MarketInfoDTO {
    private int id;
    private String getDate;   // 거래일자
    private String pumNm;     // 품목명
    private String gName;     // 등급
    private int avP;          // 평균가
    private int miP;          // 최저가
    private int maP;          // 최고가
    private Integer pavP;     // 전일평균가 (null 가능)
    private Integer fluc;     // 등락 (null 가능)
    private String uName;     // 거래단위
    private Integer dMark;    // 전일대비(%)
    private Integer j7;       // 전 7일 평균가
    private Integer j7Mark;   // 전 7일 대비(%)
    private String sPosGubun; // 시장구분
    private Timestamp createdAt; // 생성 시간

    // ✅ Getter & Setter
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getGetDate() { return getDate; }
    public void setGetDate(String getDate) { this.getDate = getDate; }

    public String getPumNm() { return pumNm; }
    public void setPumNm(String pumNm) { this.pumNm = pumNm; }

    public String getGName() { return gName; }
    public void setGName(String gName) { this.gName = gName; }

    public int getAvP() { return avP; }
    public void setAvP(int avP) { this.avP = avP; }

    public int getMiP() { return miP; }
    public void setMiP(int miP) { this.miP = miP; }

    public int getMaP() { return maP; }
    public void setMaP(int maP) { this.maP = maP; }

    public Integer getPavP() { return pavP; }
    public void setPavP(Integer pavP) { this.pavP = pavP; }

    public Integer getFluc() { return fluc; }
    public void setFluc(Integer fluc) { this.fluc = fluc; }

    public String getUName() { return uName; }
    public void setUName(String uName) { this.uName = uName; }

    public Integer getDMark() { return dMark; }
    public void setDMark(Integer dMark) { this.dMark = dMark; }

    public Integer getJ7() { return j7; }
    public void setJ7(Integer j7) { this.j7 = j7; }

    public Integer getJ7Mark() { return j7Mark; }
    public void setJ7Mark(Integer j7Mark) { this.j7Mark = j7Mark; }

    public String getSPosGubun() { return sPosGubun; }
    public void setSPosGubun(String sPosGubun) { this.sPosGubun = sPosGubun; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
}
