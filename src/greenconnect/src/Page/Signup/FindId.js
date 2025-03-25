import axios from "axios";
import { useState } from "react";
import './css/FindId.css';

function FindId() {
    const [userName, setUserName] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [foundId, setFoundId] = useState(null);

    return (
        <div style={{ marginTop: '80px' }}>
            <div className="find-id-container">
                <h1>아이디 찾기</h1>
                <label>이름</label>
                <input type="text" onChange={(e) => setUserName(e.target.value)} />

                <label>전화번호</label>
                <input type="tel" onChange={(e) => setTel(e.target.value)} />

                <label>이메일</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} />
                <button onClick={() => {
                    axios.post(
                        "/api/user/find-id",
                        {
                            userName,
                            tel,
                            email
                        })
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