import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MarketInfo.css';

function MarketInfo() {
  const [marketList, setMarketList] = useState([]);
  const [message, setMessage] = useState('');

  // 페이지 로드 시 DB에 저장된 목록 조회
  useEffect(() => {
    fetchMarketData();
  }, []);

  // DB 조회
  const fetchMarketData = async () => {
    try {
      const res = await axios.get('/api/marketInfo');
      setMarketList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 공공데이터 -> DB 저장 요청
  const handleFetch = async () => {
    try {
      const res = await axios.get('/api/marketInfo/fetch', {
      params: { date: '2025-03-11' } // 필요한 날짜
    });
      setMessage(res.data); // 예: "5건 저장 완료!"
      // 저장 후 목록 다시 조회
      fetchMarketData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="market-info-container">
      <h1>가락시장</h1>
      <p>매일매일 새롭다. 가락시장의 농수산물 도매가격 정보</p>

      {/* [2025년 03월 10일] 가락시장 평균 | 최저 | 최고 */}
      <section className="chart-section">
        <h2>[2025년 03월 10일] 가락시장 평균 | 최저 | 최고</h2>
        <div className="chart-container">
          {/* 실제 차트 대신, 예시로 숫자 요약 섹션 */}
          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">평균</span>
              <span className="stat-value">2,100원</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">최저</span>
              <span className="stat-value">1,800원</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">최고</span>
              <span className="stat-value">2,400원</span>
            </div>
          </div>
        </div>
      </section>

      {/* 더 자세한 가격 변동 (예: 바 차트 영역) */}
      <section className="chart-section">
        <h2>[2025년 03월 10일] 더 자세한 가격 변동</h2>
        <div className="chart-container bar-chart">
          {/* 실제 바 차트를 그릴 경우, Chart.js 등 라이브러리로 구현 */}
        </div>
      </section>

      {/* Best View 영역 */}
      <section className="best-view">
        <h2>[Best View]</h2>
        <p>평일 가장 많이 오른 품목: 양파 (▲200원)</p>
        <p>평일 가장 많이 내린 품목: 배추 (▼150원)</p>
        <p>금일 가격은 2,380원! 집에서 편하게 장보세요.</p>
      </section>

      {/* 공공데이터 불러오기 버튼 & 결과 메시지 */}
      <button className="fetch-button" onClick={handleFetch}>
        공공데이터 불러오기
      </button>
      {message && <p className="fetch-result">{message}</p>}

      {/* DB에 저장된 데이터 테이블 */}
      <table>
        <thead>
          <tr>
            <th>품목명</th>
            <th>도매시장</th>
            <th>등급</th>
            <th>단위</th>
            <th>평균가</th>
            <th>최고가</th>
            <th>최저가</th>
          </tr>
        </thead>
        <tbody>
          {marketList.map((item, idx) => (
            <tr key={idx}>
              <td>{item.itemName}</td>
              <td>{item.marketName}</td>
              <td>{item.grade}</td>
              <td>{item.unit}</td>
              <td>{item.avgPrice}</td>
              <td>{item.maxPrice}</td>
              <td>{item.minPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MarketInfo;
