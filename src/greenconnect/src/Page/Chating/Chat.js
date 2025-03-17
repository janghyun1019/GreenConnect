import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Chat = () => {
    const { userId } = useSelector(state => state.user);
    const { state } = useLocation();
    const { targetUserId, roomId } = state || {};

    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const messagesRef = useRef(null);
    const navigate = useNavigate();
    const socketRef = useRef(null);
    const reconnectAttempts = useRef(0); // [확장] 재연결 시도 카운터

    // 기존: WebSocket 연결 함수
    const connectWebSocket = () => {
        if (!userId || !roomId) {
            navigate('/chatrooms');
            return;
        }
        const ws = new WebSocket(`ws://localhost:8080/chat?userId=${userId}&roomId=${roomId}`);
        socketRef.current = ws;

        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({ type: 'loadInitial', roomId, page: 0 }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'loadInitial' || data.type === 'loadMore') {
                const newMessages = data.messages.reverse();
                setMessages(prev => {
                    const updated = data.type === 'loadInitial' ? newMessages : [...newMessages, ...prev];
                    return updated.filter((msg, idx, self) => 
                        self.findIndex(m => m.messageId === msg.messageId) === idx
                    );
                });
                setHasMore(data.hasMore);
                if (messagesRef.current && data.type === 'loadInitial') {
                    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
                }
            } else if (data.type === 'read') {
                setMessages(prev => prev.map(msg => 
                    msg.messageId === data.messageId ? { ...msg, read: data.userId === userId ? 'N' : 'Y' } : msg
                ));
            } else {
                setMessages(prev => {
                    const exists = prev.some(msg => msg.messageId === data.messageId);
                    return exists ? prev : [...prev, { ...data, read: 'N' }];
                });
                if (data.senderId !== userId) {
                    axios.post('/api/chat/read', { roomId, messageId: data.messageId, userId }, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
                    }).catch(error => console.error('읽음 처리 실패:', error));
                }
                if (messagesRef.current) {
                    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
                }
            }
        };

        ws.onclose = () => {
            setSocket(null);
            socketRef.current = null;
        };

        // [확장]: 디버깅 및 재연결 제어
        console.log('[확장] WebSocket 연결 시도: url=ws://localhost:8080/chat?userId=' + userId + '&roomId=' + roomId);
        ws.onopen = () => {
            console.log('[확장] WebSocket 연결 성공');
            setSocket(ws);
            reconnectAttempts.current = 0; // [확장] 연결 성공 시 카운터 초기화
            ws.send(JSON.stringify({ type: 'loadInitial', roomId, page: 0 }));
        };
        ws.onclose = (event) => {
            console.log('[확장] WebSocket 연결 종료, 코드:', event.code, '이유:', event.reason);
            setSocket(null);
            socketRef.current = null;
            // [확장] 재연결 시도 제한
            if (reconnectAttempts.current < 5) {
                console.log('[확장] 재연결 시도: ' + (reconnectAttempts.current + 1));
                setTimeout(connectWebSocket, 1000 * (reconnectAttempts.current + 1)); // 지연 증가
                reconnectAttempts.current += 1;
            } else {
                console.log('[확장] 최대 재연결 시도 초과, 중단');
            }
        };
        ws.onerror = (error) => {
            console.error('[확장] WebSocket 오류:', error);
        };
    };

    // 기존: 컴포넌트 마운트 시 연결
    useEffect(() => {
        if (!state || !userId) {
            navigate('/chatrooms');
            return;
        }
        connectWebSocket();
        return () => {
            if (socketRef.current) socketRef.current.close();
        };
    }, [userId, roomId, navigate]);

    // [확장]: 소켓 유지 로직 (중복 호출 방지)
    useEffect(() => {
        if (!state || !userId) {
            navigate('/chatrooms');
            return;
        }
        if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
            console.log('[확장] 소켓 상태 확인 후 재연결');
            connectWebSocket();
        }
        return () => {
            console.log('[확장] useEffect 정리 호출');
            // if (socketRef.current) socketRef.current.close(); // [확장] 테스트용 비활성화
        };
    }, [userId, roomId, navigate]);

    // 기존
    const handleImageUpload = (e) => {
        setImages(Array.from(e.target.files));
    };

    // 기존
    const uploadImages = async (files) => {
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
            headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        if (!response.ok) throw new Error('이미지 업로드 실패');
        return await response.json();
    };

    // 기존: 메시지 전송 함수
    const sendMessage = async () => {
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
            connectWebSocket();
            await new Promise(resolve => setTimeout(resolve, 500));
            if (!socketRef.current) return;
        }
        if (!input.trim() && images.length === 0) return;

        let imageUrls = null;
        if (images.length > 0) {
            imageUrls = JSON.stringify(await uploadImages(images));
        }

        const payload = {
            roomId: roomId.toString(),
            content: input.trim() || null,
            imageUrls: imageUrls
        };
        socketRef.current.send(JSON.stringify(payload));
        setInput('');
        setImages([]);
    };

    // [확장]: 전송 안정화 및 디버깅
    const enhancedSendMessage = async () => {
        console.log('[확장] enhancedSendMessage 호출 시작');
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
            console.log('[확장] 소켓 연결 없음, 현재 상태:', socketRef.current ? socketRef.current.readyState : 'null');
            connectWebSocket();
            await new Promise(resolve => setTimeout(resolve, 2000));
            if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
                console.log('[확장] 소켓 재연결 실패, 최종 상태:', socketRef.current ? socketRef.current.readyState : 'null');
                return;
            }
            console.log('[확장] 소켓 재연결 성공, 상태:', socketRef.current.readyState);
        }
        if (!input.trim() && images.length === 0) {
            console.log('[확장] 입력값 없음, 전송 중단');
            return;
        }

        let imageUrls = null;
        if (images.length > 0) {
            console.log('[확장] 이미지 업로드 시작');
            imageUrls = JSON.stringify(await uploadImages(images));
            console.log('[확장] 이미지 업로드 완료:', imageUrls);
        }

        const payload = {
            roomId: roomId.toString(),
            content: input.trim() || null,
            imageUrls: imageUrls
        };
        console.log('[확장] 전송 메시지:', payload);

        const tempMessage = {
            roomId: roomId.toString(),
            senderId: userId,
            content: input.trim() || null,
            imageUrls: imageUrls,
            sentAt: new Date().toString(),
            read: 'N',
            messageId: null
        };
        setMessages(prev => {
            const updated = [...prev, tempMessage];
            console.log('[확장] 발송 후 즉시 추가된 메시지 상태:', updated);
            return updated;
        });
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }

        console.log('[확장] 소켓 전송 시도');
        try {
            socketRef.current.send(JSON.stringify(payload));
            console.log('[확장] 소켓 전송 완료');
        } catch (error) {
            console.error('[확장] 소켓 전송 실패:', error);
        }
        setInput('');
        setImages([]);
    };

    // 기존
    const leaveChat = () => {
        axios.post(`/api/chat/leave/${roomId}/${userId}`, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        }).then(() => {
            if (socketRef.current) socketRef.current.close();
            navigate('/chatrooms');
        });
    };

    // 기존
    const deleteChatRoom = () => {
        if (!window.confirm('정말로 채팅방을 삭제하시겠습니까?')) return;
        axios.delete(`/api/chat/room/${roomId}/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        }).then(() => {
            if (socketRef.current) socketRef.current.close();
            navigate('/chatrooms', { replace: true });
        });
    };

    // 기존
    const loadMore = () => {
        if (socketRef.current && hasMore) {
            socketRef.current.send(JSON.stringify({ type: 'loadMore', roomId, page: page + 1 }));
            setPage(prev => prev + 1);
        }
    };

    // 기존
    const formatDate = (timestamp) => new Date(timestamp).toLocaleDateString('ko-KR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // 기존
    const groupedMessages = () => {
        const grouped = [];
        let lastDate = null;
        messages.forEach(msg => {
            const msgDate = formatDate(msg.sentAt);
            if (msgDate !== lastDate) {
                grouped.push({ type: 'date', value: msgDate });
                lastDate = msgDate;
            }
            grouped.push({ type: 'message', ...msg });
        });
        return grouped;
    };

    // [확장]: 없는 닉네임 검증 추가
    const checkNicknameExists = async () => {
        try {
            const response = await axios.get(`/api/user/check-nickname/${targetUserId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            });
            if (!response.data.exists) {
                alert('없는 닉네임입니다.');
                navigate('/chatrooms');
                return false;
            }
            return true;
        } catch (error) {
            console.error('[확장] 닉네임 검증 실패:', error);
            alert('닉네임 검증 중 오류가 발생했습니다.');
            navigate('/chatrooms');
            return false;
        }
    };

    // [확장]: 닉네임 검증 후 연결
    useEffect(() => {
        const initializeChat = async () => {
            if (!state || !userId) {
                navigate('/chatrooms');
                return;
            }
            const nicknameExists = await checkNicknameExists();
            if (nicknameExists) {
                connectWebSocket();
            }
        };
        initializeChat();
        return () => {
            if (socketRef.current) socketRef.current.close();
        };
    }, [userId, roomId, targetUserId, navigate]);

    // 기존
    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column', background: '#f7f7f7' }}>
            <div style={{ padding: '10px', background: '#ffeb33', textAlign: 'center', position: 'sticky', top: 0 }}>
                <h2>{targetUserId || 'Unknown'}</h2>
                <button onClick={leaveChat} style={{ position: 'absolute', right: '60px' }}>목록으로</button>
                <button onClick={deleteChatRoom} style={{ position: 'absolute', right: '10px', background: '#ff3333', color: 'white' }}>삭제</button>
            </div>
            <div ref={messagesRef} style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                {hasMore && <button onClick={loadMore}>더 보기</button>}
                {groupedMessages().map((item, idx) => (
                    item.type === 'date' ? (
                        <div key={idx} style={{ textAlign: 'center', color: '#888', margin: '10px 0' }}>
                            <hr style={{ border: '1px solid #ddd' }} />
                            {item.value}
                        </div>
                    ) : (
                        <div key={idx} style={{ display: 'flex', justifyContent: item.senderId === userId ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
                            <div style={{ maxWidth: '70%', background: item.senderId === userId ? '#ffeb33' : '#fff', padding: '8px 12px', borderRadius: '10px' }}>
                                {item.content && <p>{item.content}</p>}
                                {item.imageUrls && JSON.parse(item.imageUrls).map((url, i) => (
                                    <img key={i} src={url} alt="chat" style={{ maxWidth: '100%', marginTop: '5px' }} />
                                ))}
                                <span style={{ fontSize: '10px', color: '#888', display: 'block', textAlign: 'right' }}>
                                    {new Date(item.sentAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                                    {item.read === 'Y' && ' (읽음)'}
                                </span>
                            </div>
                        </div>
                    )
                ))}
            </div>
            <div style={{ padding: '10px', background: '#fff', borderTop: '1px solid #ddd', display: 'flex', alignItems: 'center' }}>
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ marginRight: '10px' }} />
                <input value={input} onChange={(e) => setInput(e.target.value)} style={{ flex: 1, padding: '5px' }} placeholder="메시지를 입력하세요" />
                <button onClick={enhancedSendMessage} style={{ padding: '5px 10px', background: '#ffeb33' }}>전송</button>
            </div>
        </div>
    );
};

export default Chat;