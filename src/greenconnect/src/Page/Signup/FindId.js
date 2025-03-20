import axios from "axios";
import { useState } from "react";

import "../../common/commonPage.css";
import "./Signup.css";


function FindId() {
	const [email, setEmail] = useState("");
	const [foundId, setFoundId] = useState(null);

	return (
		<div className="signupContainer01">
			<div className="title">
				<i class="fa-solid fa-id-card"></i> 아이디 찾기
			</div>
			<div className="titlesub">아이디를 찾아드립니다.</div>
			<div className="signupContainer">
				<input
					type="email"
					placeholder="이메일을 입력하세요"
					value={email}
					onChange={(e) => setEmail(e.target.value)} /> <br /><br />
				<button onClick={() => {
					axios.post("/user/find-id", { email })
						.then(response => {
							alert("이메일로 아이디를 전송했습니다.");
						})
						.catch(error => {
							alert("아이디 찾기 실패: " + error.response.data);
						})
				}}>아이디 찾기</button>
			</div>
		</div>
	);
}

export default FindId;