import axios from "axios";
import {useState} from 'react';

function Signup(){

    let [userId, setUserId] = useState('');
    let [password, setPassWord] = useState('');
    let [confirmPw, setConfirmPw] = useState(""); 
    let [userName, setUserName] = useState('');
    let [nickName, setNickName] = useState('');
    let [jumin, setJumin] = useState('');
    let [tel, setTel] = useState('');
    let [email, setEmail] = useState('');



    return (
        <div>
            <div>
            <h1>회원가입 페이지</h1>

            아이디 <input type="text" onChange={(e) => setUserId(e.target.value)} /> <br />
            비밀번호 <input type="password" onChange={(e) => setPassWord(e.target.value)} /> <br />
            비밀번호 확인 <input type="password" onChange={(e) => setConfirmPw(e.target.value)} /> <br />
            이름 <input type="text" onChange={(e) => setUserName(e.target.value)} /> <br />
            닉네임 <input type="text" onChange={(e) => setNickName(e.target.value)} /> <br />
            주민번호 <input type="text" onChange={(e) => setJumin(e.target.value)} /> <br />
            휴대폰번호 <input type="tel" onChange={(e) => setTel(e.target.value)} /> <br />
            이메일 <input type="email" onChange={(e) => setEmail(e.target.value)} /> <br />
        </div>
        
        <button onClick={()=>{
            axios.post(
                "/user/signup",
                {
                    userId ,
                    password ,
                    userName ,
                    nickName ,
                    jumin ,
                    tel ,
                    email 
                },
                {
                    headers :{
                        'Content-type':'application/json'
                    }
                }
            )
            .then(response =>{
                console.log(response.data);
                if(response.data == 'ok'){

                }
            })
            .catch(error => {
                console.log(error);
            })
            
        }}>가입하기</button>

        </div> //맨 앞 감싸는 div 끝
        
    );
}

export default Signup;