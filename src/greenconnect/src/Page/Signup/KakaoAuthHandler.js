import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser, resetUser } from "../../store/store";

function KakaoAuthHandler() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetUser()); // 로그인 전 상태 초기화
        const query = new URLSearchParams(window.location.search);
        const code = query.get("code");
        console.log("Kakao code:", code);



        if (code) {
            axios
                .post("http://localhost:8080/user/kakao-login", { code })
                .then((response) => {
                    const { success, userId, nickname, email, message } = response.data;
                    if (success) {
                        dispatch(loginUser({ userId, nickname, email }));
                        alert(message); // "이미 가입되어 있습니다" 또는 "카카오 로그인 성공"
                        navigate("/TestMain");
                    } else {
                        alert(message); // "이미 가입된 이메일 또는 사용자 이름입니다"
                        navigate("/");
                    }
                })
                .catch((error) => {
                    console.error("카카오 로그인 실패:", error);
                    alert("카카오 로그인 실패");
                    navigate("/");
                });
        } else {
            alert("카카오 인증 코드가 없습니다.");
            navigate("/");
        }
    }, [dispatch, navigate]);

    return <h2>카카오 로그인 처리 중...</h2>;
}

export default KakaoAuthHandler;