import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser, resetUser } from "../../store/store";

function NaverAuthHandler() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetUser()); // 로그인 전 상태 초기화
        const query = new URLSearchParams(window.location.search);
        const code = query.get("code");
        console.log("Naver code:", code);

        console.log("NaverAuthHandler called with code:", code);

        if (code) {
            console.log("Sending request to /user/naver-login with code:", code);
            axios
                .post("http://localhost:8080/user/naver-login", { code })
                .then((response) => {
                    console.log("Naver login response:", response.data);
                    const { success, userId, nickname, email } = response.data;
                    if (success) {
                        dispatch(loginUser({ userId, nickname, email }));
                        alert("네이버 로그인 성공!");
                        navigate("/TestMain");
                    } else {
                        throw new Error(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error("네이버 로그인 실패:", error);
                    alert("네이버 로그인 실패");
                    navigate("/");
                });
        } else {
            alert("네이버 인증 코드가 없습니다.");
            navigate("/");
        }
    }, [dispatch, navigate]);

    return <h2>네이버 로그인 처리 중...</h2>;
}

export default NaverAuthHandler;