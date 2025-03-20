import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token"); // 이메일에서 받은 토큰
    const [newPassword, setNewPassword] = useState("");

    return (
        <div>
            <h1>비밀번호 재설정</h1>
            새 비밀번호 <input type="password" onChange={(e) => setNewPassword(e.target.value)} /> <br />
            <button onClick={()=>{
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
    );
}

export default ResetPassword;