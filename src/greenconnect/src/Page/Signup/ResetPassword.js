import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import "../../common/commonPage.css";
import "./Signup.css";

function ResetPassword() {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token"); // 이메일에서 받은 토큰
	const [newPassword, setNewPassword] = useState("");

	return (
		<div className="signupContainer01">
			<div className="title">
				<i class="fa-solid fa-lock-open"></i> 비밀번호 재설정
			</div>
			<div className="titlesub">새 비밀번호로 변경합니다.</div>

			<div className="signupContainer">
				<div className="suline">
					<input
						type="password"
						placeholder="새 비밀번호"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
				</div>
				<button onClick={() => {
					axios.post("/user/reset-password", { token, newPassword })
						.then(response => {
							alert("비밀번호가 성공적으로 변경되었습니다.");
							window.location.href = "/login";
						})
						.catch(error => {
							alert("비밀번호 변경 실패: " + error.response.data.message);
						});
				}}>비밀번호 변경</button>
			</div>
		</div>
	);
}

export default ResetPassword;