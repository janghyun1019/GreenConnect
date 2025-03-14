import { Link } from 'react-router-dom';
import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import "./css/Admin.css";

function Admin() {
    const[dashboardData,setDashboardData] = useState(null);
    useEffect(() => {
        axios.get("/admin/dashboard", {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        })
        .then(response => {
          console.log("API Response:", response.data);  // 데이터 구조 확인
            setDashboardData(response.data);
        })
        .catch(error => {
            console.error("Error fetching dashboard data:", error);
            console.error("Error details:", error.response ? error.response.data : "No response data");
            console.error("Status code:", error.response ? error.response.status : "No status code");
        });
        }, []);

    return(
        <div className="admin-container">
        <div className="adminAside">
            <ul>
                <li><Link to="/Admin">관리자 홈</Link></li>
                <li><Link to="/Customer">사용자관리</Link></li>
                <li><Link to="/Trade">거래관리</Link></li>
                <li><Link to="/Quality">품질관리</Link></li>
                <li><Link to="/System">시스템설정</Link></li>
                <li><Link to="/CuSupport">고객지원</Link></li>
            </ul>
        </div>
            <div className="adminContent">
            <h2>관리자 홈</h2>
            {dashboardData ? (
                <div className="dashboard">
                    <p>이용자 수: {dashboardData.userCount}</p>
                    <p>일일 매출: {dashboardData.dailySales}</p>
                    <p>주간 매출: {dashboardData.weeklySales}</p>
                    <p>월간 매출: {dashboardData.monthlySales}</p>
                    <p>신규 가입자: {dashboardData.newUsers}</p>
                    <p>미처리 신고 건수: {dashboardData.pendingReports}</p>
                    <p>거래 수: {dashboardData.tranactionCount}</p>
                    <p>시스템 상태: {dashboardData.systemStatus}</p>
                </div>
            ) : (
                <p>데이터를 불러오는 중...</p>
            )}
            </div>
        </div>
        );
    };
export default Admin;