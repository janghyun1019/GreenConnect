import axios from "axios";
import { useState } from "react";
import './css/FindPassword.css';

function FindPassword() {
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");

    return (
        <div style={{ marginTop: '80px' }}>
            <div className="find-password-container">
                <h1>비밀번호 찾기</h1>

                <label>아이디</label>
                <input type="text" onChange={(e) => setUserId(e.target.value)} />

                <label>이름</label>
                <input type="text" onChange={(e) => setUserName(e.target.value)} />

                <label>전화번호</label>
                <input type="tel" onChange={(e) => setTel(e.target.value)} />

                <label>이메일</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} />

                <button onClick={() => {
                    axios.post("/api/user/find-password", { userId, userName, tel, email })
                        .then(response => {
                            alert("비밀번호 재설정 링크가 이메일로 전송되었습니다.");
                        })
                        .catch(error => {
                            alert("비밀번호 찾기 실패: " + error.response.data);
                        });
                }}>
                    비밀번호 찾기
                </button>
            </div>
        </div>
    );
}

export default FindPassword;