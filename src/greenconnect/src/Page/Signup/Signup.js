import axios from "axios";
import { useState } from 'react';

import "../../common/commonPage.css";
import "./Signup.css";

function Signup() {

	let [userId, setUserId] = useState('');
	let [password, setPassWord] = useState('');
	let [confirmPw, setConfirmPw] = useState("");
	let [userName, setUserName] = useState('');
	let [nickName, setNickName] = useState('');
	let [jumin, setJumin] = useState('');
	let [tel, setTel] = useState('');
	let [email, setEmail] = useState('');




	return (
		<div className="signupContainer01">
			<div className="title">
				<i class="fa-solid fa-user-plus"></i> 회원가입 페이지
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

				<div className="suline">
					<input
						type="password"
						placeholder="비밀번호 확인"
						value={confirmPw}
						onChange={(e) => setConfirmPw(e.target.value)}
					/>
				</div>

				<div className="suline">
					<input
						type="text"
						placeholder="이름"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
				</div>

				<div className="suline">
					<input
						type="text"
						placeholder="닉네임"
						value={nickName}
						onChange={(e) => setNickName(e.target.value)}
					/>
				</div>

				<div className="suline">
					<input
						type="text"
						placeholder="주민등록번호"
						value={jumin}
						onChange={(e) => setJumin(e.target.value)}
					/>
				</div>

				<div className="suline">
					<input
						type="tel"
						placeholder="휴대폰번호"
						value={tel}
						onChange={(e) => setTel(e.target.value)}
					/>
				</div>

				<div className="suline">
					<input
						type="email"
						placeholder="이메일"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
			</div>
			<div className="siginupbutton">
			<button onClick={() => {
				axios.post(
					"/user/signup",
					{
						userId,
						password,
						userName,
						nickName,
						jumin,
						tel,
						email
					},
					{
						headers: {
							'Content-type': 'application/json'
						}
					}
				)
					.then(response => {
						console.log(response.data);
						if (response.data == 'ok') {

						}
					})
					.catch(error => {
						console.log(error);
					})

			}}>가입하기</button></div>

		</div> //맨 앞 감싸는 div 끝

	);
}

export default Signup;