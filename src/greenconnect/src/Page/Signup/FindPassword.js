import axios from "axios";
import { useState } from "react";

import "../../common/commonPage.css";
import "./Signup.css";

function FindPassword() {
	const [email, setEmail] = useState("");

	return (
		<div className="signupContainer01">
			<div className="title">
				<i class="fa-solid fa-lock-open"></i> 비밀번호 찾기
			</div>
			<div className="titlesub">새 비밀번호로 변경합니다.</div>
			<div className="signupContainer">
				<div className="suline">
					<input
						type="email"
						placeholder="이메일을 입력하세요"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<br />
				<button onClick={() => {
					axios.post("/user/find-password", { email })
						.then(response => {
							alert("비밀번호 재설정 링크가 이메일로 전송되었습니다.");
						})
						.catch(error => {
							alert("비밀번호 찾기 실패: " + error.response.data);
						})
				}}>비밀번호 찾기</button>
			</div>
		</div>
	);
}

export default FindPassword; 
