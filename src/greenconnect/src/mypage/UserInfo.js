import './css/UserInfo.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserInfo() {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get('/user/detail', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUserInfo(response.data);
        } catch (error) {
            console.error("사용자 정보 가져오기 실패:", error);
        }
    };

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
        
        try {
            await axios.put('/user/update', userInfo, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('개인정보가 업데이트되었습니다.');
            navigate('/');
        } catch (error) {
            console.error("개인정보 업데이트 실패:", error);
            alert('개인정보 업데이트에 실패했습니다.');
        }
    };

    return (
        <div className="userinfo-container">
            <h2>개인정보 수정</h2>
            
            <div className="userinfo-form">
                <form onSubmit={updateUserInfo}>
                    <div className="form-group">
                        <label>이름</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={userInfo.name || ''} 
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
                            name="phone" 
                            value={userInfo.phone || ''} 
                            onChange={handleChange} 
                        />
                    </div>
                    
                    <button type="submit">정보 업데이트</button>
                </form>
            </div>

            </div>
    );
}

export default UserInfo;