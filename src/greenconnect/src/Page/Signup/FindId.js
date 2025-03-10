import axios from "axios";
import { useState } from "react";

function FindId() {
    const [userName, setUserName] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [foundId, setFoundId] = useState(null);

    return (
        <div>
            <h1>아이디 찾기</h1>
            이름 <input type="userName" onChange={(e) => setUserName(e.target.value)} /> <br />
            전화번호 <input type="tel" onChange={(e) => setTel(e.target.value)} /> <br />
            이메일 <input type="email" onChange={(e) => setEmail(e.target.value)} /> <br />
            <button onClick={()=>{
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
    );
}

export default FindId;