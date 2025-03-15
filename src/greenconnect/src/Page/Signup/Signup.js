import axios from 'axios';
import { useState, useEffect } from 'react';

function Signup() {
    let [userId, setUserId] = useState('');
    let [password, setPassWord] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let [userName, setUserName] = useState('');
    let [nickName, setNickName] = useState('');
    let [tel, setTel] = useState('');
    let [email, setEmail] = useState('');
    let [code, setCode] = useState('');
    let [message, setMessage] = useState('');

    // 인증 상황
    let [isVerified, setIsVerified] = useState(false);
    let [hideCode, setHideCode] = useState(false);
    let [codeMessage, setCodeMessage] = useState('');

    // 유효성 검증
    const [validId, setValidId] = useState('');
    const [validPassword, setValidPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState('');
    const [validName, setValidName] = useState('');
    const [validNickName, setValidNickName] = useState('');
    const [validTel, setValidTel] = useState('');
    const [validEmail, setValidEmail] = useState('');

    // 정규식
    const ID_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9-_]{4,16}$/;
    const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    const NAME_REGEX = /^[가-힣a-zA-Z]{2,10}$/;
    const NICKNAME_REGEX = /^[a-zA-Z가-힣0-9]{2,10}$/;
    const TEL_REGEX = /^01[016789]-\d{3,4}-\d{4}$/;
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // 유효성 검사
    useEffect(() => { setValidId(userId ? (ID_REGEX.test(userId) ? "4자~16자로 입력해주세요." : " 4자~16자로 입력해주세요.") : ""); }, [userId]);
    useEffect(() => { setValidPassword(password ? (PASSWORD_REGEX.test(password) ? " 사용 가능한 비밀번호 입니다. " : " 8~16자의 숫자+ 영문 +특수문자를 포함해야 합니다.") : ""); }, [password]);
    useEffect(() => { setValidConfirmPassword(confirmPassword ? (confirmPassword === password ? " 비밀번호가 일치합니다." : " 비밀번호가 다릅니다.") : ""); }, [confirmPassword, password]);
    useEffect(() => { setValidName(userName ? (NAME_REGEX.test(userName) ? " 사용가능한 이름입니다." : " 2~10자 이름을 입력하세요.") : ""); }, [userName]);
    useEffect(() => { setValidNickName(nickName ? (NICKNAME_REGEX.test(nickName) ? " 2~10자 한글/영문/숫자로 입력하세요." : " 2~10자 한글/영문/숫자로 입력하세요") : ""); }, [nickName]);
    useEffect(() => { setValidTel(tel ? (TEL_REGEX.test(tel) ? " 01x-xxxx-xxxx 형식 입니다." : " 01x-xxxx-xxxx 형식 입니다.") : ""); }, [tel]);
    useEffect(() => { setValidEmail(email ? (EMAIL_REGEX.test(email) ? " 이메일 형식이 올바르지 않습니다." : " 이메일 형식이 올바르지 않습니다.") : ""); }, [email]);

    // 메시지 색상 결정 함수
    const getMessageColor = (message) => {
        if (message.includes("사용 가능") || message.includes("일치합니다")) {
            return 'green';
        } else if (message.includes("이미 사용중") || message.includes("다릅니다") || message.includes("올바르지 않습니다")) {
            return 'red';
        } else {
            return 'black';
        }
    };

    // 중복 확인 함수
    const checkDuplicateId = () => {
        if (!userId.trim()) {
            setValidId("아이디를 입력해주세요.");
            return;
        }
        axios.post(
            '/user/checkDupId', // 상대 경로로 변경 (프록시 사용)
            { value: userId.trim() },
            { headers: { "Content-Type": "application/json" } }
        )
        .then(response => {
            console.log("중복 확인 응답:", response.data);
            if (response.data === "Y") {
                setValidId("이미 사용중인 아이디 입니다.");
            } else if (response.data === "N") {
                setValidId("사용 가능한 아이디 입니다.");
            } else {
                setValidId("아이디는 4자~10자 입니다.");
            }
        })
        .catch(error => {
            console.error("중복확인 요청 실패:", error.response?.status, error.response?.data || error.message);
            setValidId("서버 연결에 실패했습니다. 상태 코드: " + (error.response?.status || '알 수 없음'));
        });
    };

    return (
        <div>
            <div>
                <h1>회원가입 페이지</h1>

                아이디 <input type="text" onChange={(e) => setUserId(e.target.value.trim())} 
                onBlur={() => {
                    axios.post(
                        '/user/checkDupId',
                        { value: userId.trim() },
                        { headers: { "Content-Type": "application/json" } }
                    )
                    .then(response => {
                        console.log("중복 확인 응답:", response.data);
                        if (response.data === "Y") {
                            setValidId("이미 사용중인 아이디 입니다.");
                        } else if (response.data === "N") {
                            setValidId("사용 가능한 아이디 입니다.");
                        } else {
                            setValidId("아이디는 4자~10자 입니다.");
                        }
                    })
                    .catch(error => {
                        console.error("중복확인 요청 실패:", error.response?.status, error.response?.data || error.message);
                        setValidId("서버 연결에 실패했습니다. 상태 코드: " + (error.response?.status || '알 수 없음'));
                    });
                }} /> <br />
                <button onClick={checkDuplicateId}>중복 확인</button> <br />
                {validId && <span style={{ color: getMessageColor(validId) }}>{validId}</span>}<br/>

                비밀번호 <input type="password" onChange={(e) => setPassWord(e.target.value)} /> <br />
                {validPassword && <span style={{ color: getMessageColor(validPassword) }}>{validPassword}</span>}<br/>

                비밀번호 확인 <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} /> <br />
                {validConfirmPassword && <span style={{ color: getMessageColor(validConfirmPassword) }}>{validConfirmPassword}</span>}<br/>
                
                이름 <input type="text" onChange={(e) => setUserName(e.target.value)} /> <br />
                {validName && <span style={{ color: getMessageColor(validName) }}>{validName}</span>}<br/>

                닉네임 <input type="text" onChange={(e) => setNickName(e.target.value)} 
                onBlur={() => {
                    axios.post(
                        '/user/checkDupNickName',
                        { value: nickName.trim() },
                        { headers: { "Content-Type": "application/json" } }
                    )
                    .then(response => {
                        console.log("닉네임 중복 확인 응답:", response.data);
                        if (response.data === "Y") {
                            setValidNickName("이미 사용중인 닉네임 입니다.");
                        } else if (response.data === "N") {
                            setValidNickName("사용 가능한 닉네임 입니다.");
                        } else {
                            setValidNickName("닉네임은 2자~16자 입니다.");
                        }
                    })
                    .catch(error => {
                        console.error("닉네임 중복확인 요청 실패:", error.response?.status, error.response?.data || error.message);
                        setValidNickName("서버 연결에 실패했습니다. 상태 코드: " + (error.response?.status || '알 수 없음'));
                    });
                }} /> <br />
                {validNickName && <span style={{ color: getMessageColor(validNickName) }}>{validNickName}</span>}<br/>

                휴대폰번호 <input type="tel" onChange={(e) => setTel(e.target.value)} 
                onBlur={() => {
                    axios.post(
                        '/user/checkDupTel',
                        { value: tel.trim() },
                        { headers: { "Content-Type": "application/json" } }
                    )
                    .then(response => {
                        console.log("전화번호 중복 확인 응답:", response.data);
                        if (response.data === "Y") {
                            setValidTel("이미 사용중인 번호 입니다.");
                        } else {
                            setValidTel("사용 가능한 번호 입니다.");
                        }
                    })
                    .catch(error => {
                        console.error("전화번호 중복확인 요청 실패:", error.response?.status, error.response?.data || error.message);
                        setValidTel("서버 연결에 실패했습니다. 상태 코드: " + (error.response?.status || '알 수 없음'));
                    });
                }} /> <br />
                {validTel && <span style={{ color: getMessageColor(validTel) }}>{validTel}</span>}<br/>

                이메일 <input type="email" onChange={(e) => setEmail(e.target.value)} disabled={isVerified} 
                onBlur={() => {
                    axios.post(
                        '/user/checkDupEmail',
                        { value: email.trim() },
                        { headers: { "Content-Type": "application/json" } }
                    )
                    .then(response => {
                        console.log("이메일 중복 확인 응답:", response.data);
                        if (response.data === "Y") {
                            setValidEmail("이미 사용중인 메일 입니다.");
                        } else if (response.data === "N") {
                            setValidEmail("사용 가능한 메일 입니다.");
                        } else {
                            setValidEmail("올바른 이메일을 입력하세요.");
                        }
                    })
                    .catch(error => {
                        console.error("이메일 중복확인 요청 실패:", error.response?.status, error.response?.data || error.message);
                        setValidEmail("서버 연결에 실패했습니다. 상태 코드: " + (error.response?.status || '알 수 없음'));
                    });
                }} /><br/>
                {validEmail && <span style={{ color: getMessageColor(validEmail) }}>{validEmail}</span>}<br/>

                <button onClick={() => {
                    axios.post(
                        '/user/sendVerificationEmail',
                        { email },
                        { headers: { 'Content-Type': "application/json" } }
                    )
                    .then(response => {
                        console.log("이메일 인증 응답:", response.data);
                        alert(response.data);
                        setHideCode(true);
                    })
                    .catch(error => {
                        console.error("이메일 인증 요청 실패:", error.response?.status, error.response?.data || error.message);
                        alert("이메일 인증 요청에 실패했습니다. 상태 코드: " + (error.response?.status || '알 수 없음'));
                    });
                }} disabled={isVerified}>인증하기</button> <br />

                {hideCode && (
                    <>
                        인증 코드 <input type="text" onChange={(e) => setCode(e.target.value)} maxLength="6" disabled={isVerified} />
                        <button onClick={() => {
                            axios.post(
                                '/user/verifyEmail',
                                { code },
                                { headers: { "Content-Type": "application/json" } }
                            )
                            .then(response => {
                                console.log("인증 코드 확인 응답:", response.data);
                                setCodeMessage(response.data);
                                if (response.data === 'YES') {
                                    alert("이메일 인증이 완료되었습니다.");
                                    setIsVerified(true);
                                    console.log(isVerified);
                                } else if (isVerified === true) {
                                    setIsVerified(true);
                                    alert("이미 인증이 완료된 이메일 입니다.");
                                } else {
                                    alert("발송된 코드를 확인해 주세요.");
                                    setIsVerified(false);
                                    console.log(isVerified);
                                }
                            })
                            .catch(error => {
                                console.error("인증코드 확인 요청 실패:", error.response?.status, error.response?.data || error.message);
                                alert("인증 확인에 실패했습니다. 상태 코드: " + (error.response?.status || '알 수 없음'));
                            });
                        }} disabled={isVerified}>인증확인</button>
                    </>
                )}

            </div>

            <button onClick={() => {
                axios.post(
                    '/user/signup',
                    { userId, password, userName, nickName, tel, email },
                    { headers: { 'Content-Type': 'application/json' } }
                )
                .then(response => {
                    console.log("회원가입 응답:", response.data);
                    if (!isVerified) {
                        alert("이메일을 인증해주세요");
                        return;
                    }
                    if (response.data === 'ok') {
                        alert("회원가입이 완료되었습니다!");
                        window.location = "/";
                    } else {
                        alert("회원가입에 실패했습니다. 응답: " + response.data);
                    }
                })
                .catch(error => {
                    console.error("회원가입 요청 실패:", error.response?.status, error.response?.data || error.message);
                    alert("회원가입에 실패했습니다. 상태 코드: " + (error.response?.status || '알 수 없음'));
                });
            }}>가입하기</button>
            <button>취소</button>
        </div>
    );
}

export default Signup;