import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/store";

function GoogleAuthHandler() {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const code = query.get("code");

        if (code) {
            axios
                .post("http://localhost:8080/user/google-login", { code })
                .then((response) => {
                    const { success, userId, nickname, email } = response.data;

                    if (success) {
                        // Redux에 사용자 정보 저장
                        dispatch(loginUser({ userId, nickname, email }));

                        alert("Google 로그인 성공!");
                        navigate("/TestMain");
                    } else {
                        throw new Error(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error("Google 로그인 실패:", error);
                    alert("Google 로그인 실패: " + error.message);
                    navigate("/");
                });
        } else {
            alert("Google 인증 코드가 없습니다.");
            navigate("/");
        }
    }, [dispatch, navigate]);

    return <h2>Google 로그인 처리 중...</h2>;
}

export default GoogleAuthHandler;