import axios from "axios";
import { useState } from "react";

function FindId() {
    const [email, setEmail] = useState("");
    const [foundId, setFoundId] = useState(null);

    return (
        <div>
            <h1>아이디 찾기</h1>
            이메일 <input type="email" onChange={(e) => setEmail(e.target.value)} /> <br />
            <button onClick={()=>{
                axios.post("/user/find-id", { email })
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