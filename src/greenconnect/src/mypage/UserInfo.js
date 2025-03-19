// import './css/UserInfo.css';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar';

// function UserInfo() {
//     const [userInfo, setUserInfo] = useState({
//         userId: '',
//         userName: '',
//         email: '',
//         tel: ''
//     });
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchUserInfo();
//     }, []);

//     const fetchUserInfo = async () => {
//         try {
//             console.log("Fetching user info from:", '/user/detail');
//             const response = await axios.get('/user/detail', {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token') || ''}`
//                 }
//             });
//             console.log("Response:", response.data);
//             setUserInfo(response.data);
//         } catch (error) {
//             console.error("사용자 정보 가져오기 실패:", error.response?.data || error.message);
//             alert("사용자 정보 가져오기 실패: " + (error.response?.data?.message || error.message));
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUserInfo(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//     };

//     const handleConfirmPasswordChange = (e) => {
//         setConfirmPassword(e.target.value);
//     };

//     const updateUserInfo = async (e) => {
//         e.preventDefault();
        
//         if (password && password !== confirmPassword) {
//             alert('비밀번호가 일치하지 않습니다.');
//             return;
//         }

//         try {
//             const updatedUserInfo = { ...userInfo };
//             if (password) {
//                 updatedUserInfo.password = password;
//             }
//             await axios.post('http://localhost:8080/user/update', updatedUserInfo, { // PUT → POST
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
//             alert('개인정보가 업데이트되었습니다.');
//             setPassword('');
//             setConfirmPassword('');
//             navigate('/');
//         } catch (error) {
//             console.error("개인정보 업데이트 실패:", error.response?.data || error.message);
//             alert('개인정보 업데이트에 실패했습니다.');
//         }
//     };

//     return (
//         <div className="userinfo-container">
//             <Sidebar />
//             <div className="main-content">
//                 <h2>개인정보 수정</h2>
//                 <div className="userinfo-form">
//                     <form onSubmit={updateUserInfo}>
//                         <div className="form-group">
//                             <label>이름</label>
//                             <input 
//                                 type="text" 
//                                 name="userName" 
//                                 value={userInfo.userName || ''} 
//                                 onChange={handleChange} 
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>이메일</label>
//                             <input 
//                                 type="email" 
//                                 name="email" 
//                                 value={userInfo.email || ''} 
//                                 onChange={handleChange} 
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>전화번호</label>
//                             <input 
//                                 type="tel" 
//                                 name="tel" 
//                                 value={userInfo.tel || ''} 
//                                 onChange={handleChange} 
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>새 비밀번호</label>
//                             <input 
//                                 type="password" 
//                                 value={password} 
//                                 onChange={handlePasswordChange} 
//                                 placeholder="변경 시 입력" 
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>비밀번호 확인</label>
//                             <input 
//                                 type="password" 
//                                 value={confirmPassword} 
//                                 onChange={handleConfirmPasswordChange} 
//                                 placeholder="변경 시 입력" 
//                             />
//                         </div>
//                         <button type="submit">정보 업데이트</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default UserInfo;
import './css/UserInfo.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function UserInfo() {
    // 초기 상태 설정 (테스트용 데이터 또는 localStorage 기반)
    const [userInfo, setUserInfo] = useState({
        userId: localStorage.getItem('userId') || 'testUser', // localStorage에서 userId 가져오기, 없으면 테스트 값
        userName: '',
        email: '',
        tel: ''
    });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    // 테스트용 데이터 설정 (백엔드 연동 전)
    useEffect(() => {
        // 백엔드 연동 대신 테스트 데이터 사용
        setUserInfo(prev => ({
            ...prev,
            userName: '홍길동', // 테스트용 이름
            email: 'hong@example.com', // 테스트용 이메일
            tel: '010-1234-5678' // 테스트용 전화번호
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const updateUserInfo = async (e) => {
        e.preventDefault();

        if (password && password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const updatedUserInfo = { ...userInfo };
            if (password) {
                updatedUserInfo.password = password;
            }
            // 백엔드 연동은 나중에 활성화
            console.log('업데이트 데이터:', updatedUserInfo);
            alert('개인정보가 업데이트되었습니다. (테스트 모드)');
            setPassword('');
            setConfirmPassword('');
            navigate('/');
        } catch (error) {
            console.error("개인정보 업데이트 실패:", error.response?.data || error.message);
            alert('개인정보 업데이트에 실패했습니다: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="userinfo-container">
            <Sidebar />
            <div className="main-content">
                <h2>개인정보 수정</h2>
                <div className="userinfo-form">
                    <form onSubmit={updateUserInfo}>
                        <div className="form-group">
                            <label>이름</label>
                            <input 
                                type="text" 
                                name="userName" 
                                value={userInfo.userName || ''} 
                                onChange={handleChange} 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>이메일</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={userInfo.email || ''} 
                                onChange={handleChange} 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>전화번호</label>
                            <input 
                                type="tel" 
                                name="tel" 
                                value={userInfo.tel || ''} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className="form-group">
                            <label>새 비밀번호</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={handlePasswordChange} 
                                placeholder="변경 시 입력" 
                            />
                        </div>

                        <div className="form-group">
                            <label>비밀번호 확인</label>
                            <input 
                                type="password" 
                                value={confirmPassword} 
                                onChange={handleConfirmPasswordChange} 
                                placeholder="변경 시 입력" 
                            />
                        </div>
                        
                        <button type="submit">정보 업데이트</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;