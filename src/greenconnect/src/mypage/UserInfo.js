import './css/UserInfo.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function UserInfo() {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

        const [buyUser, setBuyUser] = useState({
            userId: '',
            userName: '',
            email: '',
            tel: ''
        });

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser) {
            setBuyUser(loggedInUser);
        }
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            console.log("Fetching user info from:", '/user/detail');
            const response = await axios.get('/user/detail', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token') || ''}`
                }
                
            });
            console.log(localStorage.getItem('token'));
            console.log("Response:", response.data);
            setBuyUser(response.data);
        } catch (error) {
            console.error("사용자 정보 가져오기 실패:", error.response?.data || error.message);
            // alert("사용자 정보 가져오기 실패: " + (error.response?.data?.message || error.message));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBuyUser(prev => ({
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
    
        const token = localStorage.getItem('token');
        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }
    
        try {
            const updatedUserInfo = { ...buyUser };
            if (password) {
                updatedUserInfo.password = password;
            }
            
            // Make sure to include proper Content-Type header as well
            const response = await axios.post('/user/update', updatedUserInfo, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.status === 200) {
                alert('개인정보가 업데이트되었습니다.');
                setPassword('');
                setConfirmPassword('');
                navigate('/');
            }
        } catch (error) {
            console.error("개인정보 업데이트 실패:", error.response?.data || error.message);
            alert('개인정보 업데이트에 실패했습니다: ' + (error.response?.data || error.message));
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
                                value={buyUser.userName || ''} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label>이메일</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={buyUser.email || ''} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="form-group">
                            <label>전화번호</label>
                            <input 
                                type="tel" 
                                name="tel" 
                                value={buyUser.tel || ''} 
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
