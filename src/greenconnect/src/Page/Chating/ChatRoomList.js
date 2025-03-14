import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChatRoomList = () => {
    const { userId } = useSelector(state => state.user);
    const [rooms, setRooms] = useState([]);
    const [targetUserId, setTargetUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            console.error('userId가 없습니다. 로그인 확인 필요.');
            navigate('/login'); // 로그인 페이지로 리다이렉트 추가
            return;
        }
        axios.get(`/api/chat/rooms/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
        .then(response => {
            console.log('채팅방 목록:', response.data);
            setRooms(response.data);
        })
        .catch(error => {
            console.error('채팅방 조회 실패:', error.response?.data || error.message);
            alert('채팅방 목록을 불러오지 못했습니다.');
        });
    }, [userId, navigate]);

    const createChatRoom = () => {
        if (!targetUserId.trim()) {
            alert('상대방 ID를 입력해주세요.');
            return;
        }

        const existingRoom = rooms.find(room =>
            (room.user1Id === userId && room.user2Id === targetUserId) ||
            (room.user1Id === targetUserId && room.user2Id === userId)
        );

        if (existingRoom) {
            console.log('기존 채팅방으로 이동:', existingRoom.roomId);
            navigate(`/chat/${existingRoom.roomId}`, {
                state: { userId, targetUserId: existingRoom.user1Id === userId ? existingRoom.user2Id : existingRoom.user1Id, roomId: existingRoom.roomId }
            });
            setTargetUserId('');
            return;
        }

        console.log('새 채팅방 생성 요청:', { user1Id: userId, user2Id: targetUserId });
        axios.post('/api/chat/create', { user1Id: userId, user2Id: targetUserId }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
        .then(response => {
            console.log('채팅방 생성 성공:', response.data);
            const newRoom = response.data;
            setRooms(prev => [...prev, newRoom]);
            navigate(`/chat/${newRoom.roomId}`, {
                state: { userId, targetUserId, roomId: newRoom.roomId }
            });
            setTargetUserId('');
        })
        .catch(error => {
            console.error('채팅방 생성 실패:', error.response?.data || error.message);
            alert('채팅방 생성에 실패했습니다.');
        });
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>채팅방 목록</h2>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    value={targetUserId}
                    onChange={(e) => setTargetUserId(e.target.value)}
                    placeholder="상대방 ID 입력"
                    style={{ padding: '5px', marginRight: '10px', flex: 1 }}
                />
                <button
                    onClick={createChatRoom}
                    style={{ padding: '5px 10px', background: '#ffeb33', border: 'none', borderRadius: '5px' }}
                >
                    채팅방 만들기
                </button>
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {rooms.map(room => (
                    <li
                        key={room.roomId}
                        onClick={() => navigate(`/chat/${room.roomId}`, {
                            state: { userId, targetUserId: room.user1Id === userId ? room.user2Id : room.user1Id, roomId: room.roomId }
                        })}
                        style={{ padding: '10px', borderBottom: '1px solid #ddd', cursor: 'pointer' }}
                    >
                        {room.user1Id === userId ? room.user2Id : room.user1Id}
                        {room.user1Active === 'N' && room.user2Active === 'N' ? ' (비활성)' : ''}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatRoomList;