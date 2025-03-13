import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./css/Admin.css";

function Customer() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [activityLog, setActivityLog] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/user/admin/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleRoleUpdate = async (userId, newRole) => {
        try {
            await axios.post('/user/admin/users/role', { userId, role: newRole });
            fetchUsers();
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    const handleSuspend = async (userId, currentStatus) => {
        const newStatus = currentStatus === 'suspended' ? 'active' : 'suspended';
        try {
            await axios.post('/user/admin/users/suspend', null, { 
                params: { userId, status: newStatus } 
            });
            fetchUsers();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleBulkSuspend = async (status) => {
        try {
            await Promise.all(
                selectedUsers.map(userId => 
                    axios.post('/user/admin/users/suspend', null, { 
                        params: { userId, status } 
                    })
                )
            );
            setSelectedUsers([]);
            fetchUsers();
        } catch (error) {
            console.error('Error in bulk suspend:', error);
        }
    };

    const fetchActivityLog = async (userId) => {
        try {
            const response = await axios.get('/user/admin/users/activity', { params: { userId } });
            setActivityLog(response.data);
            setSelectedUserId(userId);
        } catch (error) {
            console.error('Error fetching activity log:', error);
        }
    };

    return (
        <div className="adminContainer">
            <div className="adminAside">
                <ul>
                    <li><Link to="/Admin">관리자 홈</Link></li>
                    <li><Link to="/Customer">사용자관리</Link></li>
                    <li><Link to="/Trade">거래관리</Link></li>
                    <li><Link to="/Quality">품질관리</Link></li>
                    <li><Link to="/System">시스템설정</Link></li>
                    <li><Link to="/CuSupport">고객지원</Link></li>
                </ul>
            </div>
            <div className="userList">
                {users.length > 0 ? (
                    <>
                        {users.map(user => (
                            <div key={user.userId} className="userItem">
                                <input 
                                    type="checkbox" 
                                    checked={selectedUsers.includes(user.userId)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedUsers([...selectedUsers, user.userId]);
                                        } else {
                                            setSelectedUsers(selectedUsers.filter(id => id !== user.userId));
                                        }
                                    }}
                                />
                                <span>{user.userName} ({user.role}) - {user.status}</span>
                                <div>
                                    <select 
                                        onChange={(e) => handleRoleUpdate(user.userId, e.target.value)}
                                        defaultValue={user.role}
                                    >
                                        <option value="seller">판매자</option>
                                        <option value="buyer">구매자</option>
                                    </select>
                                    <button onClick={() => handleSuspend(user.userId, user.status)}>
                                        {user.status === 'suspended' ? '활성화' : '정지'}
                                    </button>
                                    <button onClick={() => fetchActivityLog(user.userId)}>로그 보기</button>
                                </div>
                            </div>
                        ))}
                        <button 
                            onClick={() => handleBulkSuspend('suspended')} 
                            disabled={selectedUsers.length === 0}
                        >
                            선택된 사용자 정지
                        </button>
                        <button 
                            onClick={() => handleBulkSuspend('active')} 
                            disabled={selectedUsers.length === 0}
                        >
                            선택된 사용자 활성화
                        </button>
                    </>
                ) : (
                    <p>사용자 목록이 없습니다.</p>
                )}
                {selectedUserId && (
                    <div className="activityLog">
                        <h2>{selectedUserId}의 활동 로그</h2>
                        {activityLog.length > 0 ? (
                            <ul>
                                {activityLog.map(log => (
                                    <li key={log.log_id}>
                                        {log.action} - {new Date(log.actionDate).toLocaleString()}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>활동 로그가 없습니다.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Customer;