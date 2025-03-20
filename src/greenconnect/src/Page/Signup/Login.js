import axios, { formToJSON } from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../../store/store";

import "../../common/commonPage.css";
import "./Signup.css";



function Login() {
	let dispatch = useDispatch();
	let [userId, setUserId] = useState('');
	let [password, setPassWord] = useState('');

	return (
		<div className="signupContainer01">
			<div className="title">
				<i class="fa-solid fa-right-to-bracket"></i> 로그인
			</div>
			<div className="titlesub">안녕하세요, 그커장터에 오신것을 환영합니다.</div>

			<div className="signupContainer">
				<div className="suline">
					<input
						type="text"
						placeholder="아이디"
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
					/>
				</div>

				<div className="suline">
					<input
						type="password"
						placeholder="비밀번호"
						value={password}
						onChange={(e) => setPassWord(e.target.value)}
					/>
				</div>

				<button onClick={() => {
					axios.post(
						"/user/login",
						{
							userId,
							password
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
							dispatch(loginUser(data));
							console.log("토큰: ", accessToken);
							console.log("리프레시: ", refreshToken);
							console.log("닉네임: ", nickname);
							if (nickname != null) {
								alert("환영합니다 " + nickname + "님!");
							} else {
								alert(data.message);
							}
							//메인화면으로 돌아가기
						})
						.catch(error => {
							alert("로그인 실패: " + error);
						})

				}}>로그인</button>
				<button onClick={() => window.location.href = "/"}>취소</button> <br />
				<button>회원가입</button>
				<button>아이디/비밀번호 찾기</button>

			</div>

		</div>
	)
}

export default Login;