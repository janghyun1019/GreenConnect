
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/store";
import { useNavigate } from "react-router-dom";

function Login() {
    let dispatch = useDispatch();
    let [userId, setUserId] = useState('');
    let [password, setPassWord] = useState('');
    const navigate = useNavigate();

    // 소셜 로그인 처리 함수
    const handleSocialLogin = (provider) => {
        const redirectUri = `http://localhost:3000/auth/${provider}/callback`;
        let authUrl;

        switch (provider) {
            case "google":
                authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=290972713499-agpe9v71ip774sidcveg0tbuc19b2t2e.apps.googleusercontent.com&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
                break;
            case "kakao":
                authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=53dc272af06402c9a2518ffbd87b1d3e&redirect_uri=${redirectUri}&response_type=code`;
                break;
                case "naver":
                    // 네이버는 prompt=login 미지원, state로 캐시 무시
                    authUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=Nkfn0QfjAXMn7bXTdYEC&redirect_uri=${redirectUri}&response_type=code&state=${Date.now()}_${Math.random().toString(36).substring(2)}`;
                    break;
                default:
                    return;
        }

        console.log(`Navigating to ${provider} auth URL: ${authUrl}`);
        window.location.href = authUrl + "&prompt=login"; // 버튼 클릭 시에만 실행
    };


    // 로그인 처리 함수
    const handleLogin = () => {
        axios.post(
            "/api/user/login",
            {
                userId,
                password,
            },
            {
                headers: {
                    'Content-type': 'application/json'
                }
            }
        )
            .then(response => {
                const data = response.data;
                let accessToken = data.accessToken;
                let refreshToken = data.refreshToken;
                let nickname = data.nickname;
                let userId = data.userId;

                // Redux에 사용자 정보 저장
                dispatch(loginUser(data));
                localStorage.setItem("loggedInUser", JSON.stringify(data));
                console.log("토큰: ", accessToken);
                console.log("리프레시: ", refreshToken);
                console.log("닉네임: ", nickname);
                console.log("아이디: ", userId);

                if (nickname != null) {
                    alert("환영합니다 " + nickname + "님!");
                    navigate("/"); 
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                alert("로그인 실패: " + error);
            });

    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h1>로그인 화면</h1>

            <div style={{ marginBottom: '10px' }}>
                아이디
                <input
                    type="text"
                    onChange={(e) => setUserId(e.target.value)}
                    value={userId}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                비밀번호
                <input
                    type="password"
                    onChange={(e) => setPassWord(e.target.value)}
                    value={password}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
            </div>

            <div>
                <button
                    onClick={handleLogin}
                    style={{ width: '100%', padding: '10px', background: '#ffeb33', border: 'none', borderRadius: '5px' }}
                >
                    로그인
                </button>
            </div>

            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <button onClick={() => window.location.href = "/"}>취소</button> <br />
                <button onClick={() => navigate("/signup")}>회원가입</button>
                <button onClick={() => navigate("/find-id")}>아이디 찾기</button>
                <button onClick={() => navigate("/find-password")}>비밀번호 찾기</button> <br />
                <div style={{ marginTop: "20px" }}>
                    <button onClick={() => handleSocialLogin("google")}>구글로 로그인</button>
                </div>
                <div style={{ marginTop: "20px" }}>
                    <button onClick={() => handleSocialLogin("kakao")}>카카오로 로그인</button>
                </div>
                <div style={{ marginTop: "20px" }}>
                    <button onClick={() => handleSocialLogin("naver")}>네이버로 로그인</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
