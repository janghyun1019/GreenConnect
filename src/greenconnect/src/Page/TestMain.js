import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, resetUser } from "../store/store"; // store에서 logoutUser 액션 가져오기
import { useNavigate } from "react-router-dom"; // 로그아웃 후 리다이렉트를 위해

const TestMain = () => {
    const { nickname } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 로그아웃 함수
    const handleLogout = () => {
        dispatch(resetUser());
        dispatch(logoutUser()); // Redux 상태 초기화 및 로컬 스토리지 제거
        alert("로그아웃 되었습니다.");
        navigate("/"); // 로그인 페이지로 리다이렉트
    };

    return (
        <div className="test-main-container">
            <h1>환영합니다 {nickname}님!</h1>
            <button 
                onClick={handleLogout}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "20px"
                }}
            >
                로그아웃
            </button>
        </div>
    );
};

export default TestMain;