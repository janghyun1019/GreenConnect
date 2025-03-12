import './css/MyPage.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyPage() {
    const [userInfo, setUserInfo] = useState({
        nickname: '',
        balance: 0,  // 기본값을 0으로 설정
        profileImage: null
    });

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

    return (
        <div className="mypageContainer">
            <h2 className="mypageLogo">마이페이지</h2>
            <div className="mypageSide">
                <ul>
                    <li><Link to="/Mypage">프로필관리</Link></li>
                    <li><Link to="/Cart">장바구니</Link></li>
                    <li><Link to="/Address">주소/결재수단</Link></li>
                    <li><Link to="/Post">작성글 목록</Link></li>
                    <li><Link to="/likes">찜한 목록</Link></li>
                    <li><Link to="/Chat">1:1채팅이력</Link></li>
                </ul>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPage;