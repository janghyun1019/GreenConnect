import './css/MyPage.css';
import { Link,useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
function MyPage() {
    const [userInfo, setUserInfo] = useState({
        nickname: '',
        balance: 0,  // 기본값을 0으로 설정
        profileImage: null
    });
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get('/user/info', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // 응답에 balance가 없을 경우 기본값 사용
            setUserInfo({
                ...response.data,
                balance: response.data.balance ?? 0
            });
        } catch (error) {
            console.error("사용자 정보 가져오기 실패:", error);
        }
    };
// 회원탈퇴 처리 함수
    const handleWithdraw = async () => {
        if (window.confirm("정말 회원탈퇴 하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
            try {
                await axios.delete('/user/withdraw', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                alert("회원탈퇴가 완료되었습니다.");
                localStorage.removeItem('token'); // 토큰 삭제
                navigate('/'); // 홈페이지로 리다이렉트
            } catch (error) {
                console.error("회원탈퇴 실패:", error);
                alert("회원탈퇴에 실패했습니다.");
            }
        }
    };
    return (
        <div className="mypageContainer">
            <h2 className="mypageLogo">마이페이지</h2>
            <div className="mypageSide">
                <Sidebar />
                <div className="dashboard">
                    <div className="card">
                        <div className="profile-image">
                            {userInfo.profileImage && (
                                <img 
                                    src={userInfo.profileImage} 
                                    alt="프로필 이미지" 
                                    style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                                />
                            )}
                        </div>
                        <div className="profile-info">
                            <p>{userInfo.nickname || "사용자 닉네임"}</p>
                            {/* 옵셔널 체이닝 연산자(?.)를 사용하여 undefined일 가능성 처리 */}
                            <p className="balance">g-pay 잔액: {userInfo?.balance?.toLocaleString() || '0'}원</p>
                        </div>
                        <Link to="/charge">
                            <button>금액 충전</button>
                        </Link>
                        <Link to="/Profile">
                            <button id="profile-change">프로필 수정</button>
                        </Link>
                    </div>
                    <div className="card">
                        개인정보
                        <Link to="/userinfo">
                            <button>수정</button>
                        </Link>
                        <button className="withdraw-btn" onClick={handleWithdraw}>회원탈퇴</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPage;