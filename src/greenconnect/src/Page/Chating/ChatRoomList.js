import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChatRoomList = () => {
    const { userId } = useSelector(state => state.user);
    const [chatRooms, setChatRooms] = useState([]);
    const [targetId, setTargetId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            console.error('[확장] 사용자 ID 없음, 로그인 페이지로 이동');
            navigate('/login');
            return;
        }
        fetchChatRooms();
    }, [userId, navigate]);

    const fetchChatRooms = async () => {
        try {
            console.log('[확장] 채팅방 목록 요청: userId=', userId);
            const response = await axios.get(`/api/chat/rooms/${userId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            });
            console.log('[확장] 채팅방 목록 응답:', response.data);
            setChatRooms(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('[확장] 채팅방 목록 로드 실패:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
            setChatRooms([]);
            if (error.response?.status === 401) {
                alert('인증 오류: 다시 로그인해주세요.');
                navigate('/login');
            }
        }
    };

    const createChatRoom = async () => {
        if (!targetId.trim()) {
            console.error('[확장] 채팅방 생성 실패: targetId 누락');
            alert('대화 상대 ID를 입력하세요.');
            return;
        }
        try {
            const response = await axios.post('/api/chat/create', {
                user1Id: userId,
                user2Id: targetId.trim()
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            });
            console.log('[확장] 채팅방 생성 성공:', response.data);
            setChatRooms(prev => [...prev, response.data]); // [확장] 목록 즉시 업데이트
            navigate(`/chat/${response.data.roomId}`, {
                state: { userId, targetUserId: targetId.trim(), roomId: response.data.roomId }
            });
        } catch (error) {
            console.error('[확장] 채팅방 생성 실패:', error.response?.data || error.message);
            alert('채팅방 생성 실패: ' + (error.response?.data || error.message));
        }
    };

    const enterChatRoom = (room) => {
        const targetUserId = room.user1Id === userId ? room.user2Id : room.user1Id;
        console.log('[확장] 채팅방 입장:', { roomId: room.roomId, targetUserId });
        navigate(`/chat/${room.roomId}`, {
            state: { userId, targetUserId, roomId: room.roomId }
        });
    };

    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        return new Date(timestamp).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>채팅방 목록</h2>
            <div style={{ marginBottom: '20px' }}>
                <input 
                    type="text" 
                    value={targetId} 
                    onChange={(e) => setTargetId(e.target.value)} 
                    placeholder="대화 상대 ID 입력" 
                    style={{ width: '70%', padding: '5px' }}
                />
                <button 
                    onClick={createChatRoom} 
                    style={{ padding: '5px 10px', background: '#ffeb33', marginLeft: '10px' }}
                >
                    채팅 시작
                </button>
            </div>
            <div>
                {chatRooms.length === 0 ? (
                    <p>활성 채팅방이 없습니다. 새 채팅을 시작해보세요!</p>
                ) : (
                    chatRooms.map(room => (
                        <div 
                            key={room.roomId} 
                            onClick={() => enterChatRoom(room)} 
                            style={{ 
                                padding: '10px', 
                                borderBottom: '1px solid #ddd', 
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <div>
                                <strong>{room.user1Id === userId ? room.user2Id : room.user1Id}</strong>
                                <p style={{ margin: '5px 0 0', color: '#666' }}>
                                    {room.lastMessage || '메시지 없음'}
                                </p>
                            </div>
                            <span style={{ fontSize: '12px', color: '#888' }}>
                                {formatTime(room.lastMessageTime)}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ChatRoomList;