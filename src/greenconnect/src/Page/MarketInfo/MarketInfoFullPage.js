import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './MarketInfoFullPage.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function MarketInfoFullPage() {
  // 공공데이터 연동 state
  const [marketList, setMarketList] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 페이지 로드 시 DB 조회
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    try {
      const res = await axios.get('/api/marketInfo'); // 백엔드 API 호출
      setMarketList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetch = async () => {
    try {
      // 공공데이터 API 호출 → DB 저장
      const res = await axios.get('/api/marketInfo/fetch', {
        params: { date: '2025-03-11' }
      });
      setMessage(res.data); // 예: "5건 저장 완료!"
      fetchMarketData();
    } catch (error) {
      console.error(error);
    }
  };

  // 차트 데이터 – marketList가 비어있을 경우 더미 데이터 사용
  const labels = marketList.length > 0 
    ? marketList.map(item => item.itemName) 
    : ["품목A", "품목B", "품목C"];

  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: "평균가",
        data: marketList.length > 0 
          ? marketList.map(item => item.avgPrice)
          : [2100, 2200, 2300],
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.1)",
        fill: false
      },
      {
        label: "최저가",
        data: marketList.length > 0 
          ? marketList.map(item => item.minPrice)
          : [1800, 1850, 1900],
        borderColor: "green",
        backgroundColor: "rgba(0,128,0,0.1)",
        fill: false
      },
      {
        label: "최고가",
        data: marketList.length > 0 
          ? marketList.map(item => item.maxPrice)
          : [2400, 2450, 2500],
        borderColor: "red",
        backgroundColor: "rgba(255,0,0,0.1)",
        fill: false
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "[2025년 03월 10일] 가격 추이" }
    }
  };

  // Bar 차트 – 예시로 거래량 데이터를 랜덤 생성 (실제 데이터가 있다면 대체)
  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: "거래량",
        data: marketList.length > 0 
          ? marketList.map(() => Math.floor(Math.random() * 1000) + 100)
          : [500, 600, 700],
        backgroundColor: "rgba(75,192,192,0.6)"
      }
    ]
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "[2025년 03월 10일] 거래량 변동" }
    }
  };

  return (
    <div className="wrap-all">


      {/* 컨텐츠 영역 */}
      <div id="container">

        <article id="contentGroup">
          <div className="pageTop">
            <div className="tit">
              <h3><i className="icoMenu menu01"></i>가락시장</h3>
              <p>매일 매일 신속한 가락시장 농산물 도매가격 정보</p>
            </div>
          </div>
          <div id="content">
            <div className="filterWrap2">
              <form action="garak.do" method="post" name="actForm">
                <input type="hidden" name="searchSymbol1" value="garak" />
                <input type="hidden" name="searchName1" value="가락" />
                <div className="inner">
                  <input type="hidden" name="menuType" value="garak" />
                  <div className="filterItem">
                    <ul className="dateItem">
                      <li>
                        <input
                          type="text"
                          name="searchDate"
                          id="pickerDate"
                          className="pickerDate"
                          title="날짜선택"
                          placeholder="날짜선택"
                          autoComplete="off"
                          defaultValue="2025년 03월 10일"
                        />
                      </li>
                    </ul>
                    <ul className="bestKey">
                      <li>
                        <input
                          type="radio"
                          id="bestDate1"
                          name="bestDate"
                          className="dateSelect bestSelect"
                          data-type="date"
                          defaultChecked
                          value="2025년 03월 10일"
                        />
                        <label htmlFor="bestDate1">최근거래일</label>
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>

            {/* 차트 영역: 라인 차트 */}
            <section className="market-charts">
              <h2>[2025년 03월 10일] 가격 추이</h2>
              <div className="chart-wrapper">
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
            </section>

            {/* 차트 영역: 바 차트 */}
            <section className="market-charts">
              <h2>[2025년 03월 10일] 거래량 변동</h2>
              <div className="chart-wrapper">
                <Bar data={barChartData} options={barChartOptions} />
              </div>
            </section>

            {/* Best View 영역 */}
            <section className="best-view">
              <h2>[Best View]</h2>
              <p>평일 가장 많이 오른 품목: 양파 (▲200원)</p>
              <p>평일 가장 많이 내린 품목: 배추 (▼150원)</p>
              <p>금일 가격은 2,380원! 집에서 편하게 장보세요.</p>
            </section>

            {/* 공공데이터 불러오기 버튼 */}
            <div className="fetch-area">
              <button onClick={handleFetch}>공공데이터 불러오기</button>
              {message && <p className="fetch-message">{message}</p>}
            </div>

            {/* DB 데이터 테이블 */}
            <table className="garak-table">
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
        </article>
      </div>


    </div>
  );
}

export default MarketInfoFullPage;
