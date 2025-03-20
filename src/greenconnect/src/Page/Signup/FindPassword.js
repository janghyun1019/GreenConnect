import axios from "axios";
import { useState } from "react";

function FindPassword() {
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div>
            <h1>비밀번호 찾기</h1>
            아이디 <input type="userId" onChange={(e) => setUserId(e.target.value)} /> <br />
            이름 <input type="userName" onChange={(e) => setUserName(e.target.value)} /> <br />
            전화번호 <input type="tel" onChange={(e) => setTel(e.target.value)} /> <br />
            이메일 <input type="email" onChange={(e) => setEmail(e.target.value)} /> <br />
            <button onClick={() => {
                axios.post(
                    "/api/user/find-password",
                    { 
                        userId,
                        userName,
                        tel,
                        email
                    })
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