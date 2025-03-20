import './css/MyPage.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';

function MyPage() {
    const navigate = useNavigate();
    const [buyUser, setBuyUser] = useState({
        nickname: '',
        balance: 0,
        profileImage: null
    });

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser) {
            setBuyUser(loggedInUser);
        }
    }, []);

    console.log("buyUser 상태:", buyUser);

    const handleWithdraw = async () => {
        if (window.confirm("정말 회원탈퇴 하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
            const storedUser = localStorage.getItem('loggedInUser');
            let token = storedUser ? JSON.parse(storedUser).accessToken : localStorage.getItem('token');
            
            if (!token) {
                alert("로그인이 필요합니다.");
                return;
            }
            try {
                await axios.post('/user/withdraw', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert("회원탈퇴가 완료되었습니다.");
                localStorage.removeItem('token');
                localStorage.removeItem('loggedInUser');
                navigate('/login');
            } catch (error) {
                console.error("회원탈퇴 실패:", error);
                alert("회원탈퇴에 실패했습니다.");
            }
        }
    };

    const openChargePopup = () => {
        window.open(
            '/gpayCharge',
            'gpayCharge',
            'width=500,height=600,left=500,top=200,resizable=no,scrollbars=no'
        );
    };

    return (
        <div className="mypageContainer">
            <h2 className="mypageLogo">마이페이지</h2>
            <div className="mypageSide">
                <Sidebar />
                <div className="dashboard">
                    <div className="card">
                        <div className="profile-image">
                            <img 
                                src={buyUser.profileImage || "/images/userimage.jpg"} 
                                alt="프로필 이미지" 
                                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                            />
                        </div>
                        <div className="profile-info">
                            <p>닉네임: {buyUser.nickname || "사용자 닉네임"}</p>
                            <p className="balance">g-pay 잔액: {(buyUser.balance || 0).toLocaleString()}원</p>
                        </div>
                        <button onClick={openChargePopup}>금액 충전</button>
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