import axios from "axios";
import { useState } from "react";

function FindPassword() {
    const [email, setEmail] = useState("");

    return (
        <div>
            <h1>비밀번호 찾기</h1>
            이메일 <input type="email" onChange={(e) => setEmail(e.target.value)} /> <br />
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
    );
}

export default FindPassword;