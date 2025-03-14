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
    const reconnectAttemptsRef = useRef(0);
    const maxReconnectAttempts = 5;
    const baseReconnectDelay = 1000;
    const [isConnecting, setIsConnecting] = useState(false);

    const connectWebSocket = async () => {
        if (!userId || !roomId) {
            console.error('[확장] 연결 실패: userId 또는 roomId 누락', { userId, roomId });
            navigate('/chatrooms');
            return;
        }

        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            console.log('[확장] 이미 연결된 소켓 존재:', { userId, roomId });
            setSocket(socketRef.current);
            return;
        }
        if (isConnecting) {
            console.log('[확장] 이미 연결 시도 중:', { userId, roomId });
            return;
        }

        setIsConnecting(true);
        const wsUrl = `ws://localhost:8080/chat?userId=${userId}&roomId=${roomId}`;
        console.log('[확장] 소켓 연결 시도:', { url: wsUrl });
        const ws = new WebSocket(wsUrl);
        socketRef.current = ws;

        ws.onopen = () => {
            console.log('[확장] WebSocket 연결 성공:', { userId, roomId });
            setSocket(ws);
            setIsConnecting(false);
            reconnectAttemptsRef.current = 0;
            setPage(0);
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('[확장] 수신 데이터:', data);

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
                    msg.messageId === data.messageId ? { ...msg, read: 'Y' } : msg
                ));
            } else if (data.type === 'error') {
                console.error('[확장] 서버 오류:', data.message);
                alert('오류: ' + data.message);
            } else {
                setMessages(prev => {
                    const exists = prev.some(msg => msg.messageId === data.messageId);
                    return exists ? prev : [...prev, data];
                });
                if (data.senderId !== userId) {
                    ws.send(JSON.stringify({ type: 'read', roomId, messageId: data.messageId }));
                }
                if (messagesRef.current) {
                    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
                }
            }
        };

        ws.onclose = (event) => {
            console.warn('[확장] WebSocket 연결 끊김:', { code: event.code, reason: event.reason });
            setSocket(null);
            socketRef.current = null;
            setIsConnecting(false);
            if (reconnectAttemptsRef.current < maxReconnectAttempts) {
                const delay = baseReconnectDelay * Math.pow(2, reconnectAttemptsRef.current);
                console.log(`[확장] 재연결 시도 ${reconnectAttemptsRef.current + 1}/${maxReconnectAttempts} in ${delay}ms`);
                reconnectAttemptsRef.current += 1;
                setTimeout(connectWebSocket, delay);
            } else {
                console.error('[확장] 최대 재연결 시도 초과');
                alert('채팅 서버에 연결할 수 없습니다.');
                navigate('/chatrooms');
            }
        };

        ws.onerror = (error) => {
            console.error('[확장] WebSocket 오류:', error);
            ws.close();
        };
    };

    const ensureSocketConnected = async () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            return true;
        }

        console.log('[확장] 소켓 연결 보장 시작');
        if (!isConnecting) {
            await connectWebSocket();
        }

        return new Promise((resolve) => {
            const maxWaitTime = 10000;
            const startTime = Date.now();
            const checkInterval = setInterval(() => {
                if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                    clearInterval(checkInterval);
                    console.log('[확장] 소켓 연결 확인됨');
                    setSocket(socketRef.current);
                    resolve(true);
                } else if (Date.now() - startTime > maxWaitTime) {
                    clearInterval(checkInterval);
                    console.error('[확장] 소켓 연결 타임아웃');
                    resolve(false);
                }
            }, 100);
        });
    };

    useEffect(() => {
        if (!state || !userId) {
            console.error('[확장] 초기 상태 오류:', { state, userId });
            navigate('/chatrooms');
            return;
        }

        connectWebSocket();

        return () => {
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.close();
                console.log('[확장] 소켓 닫힘');
            }
        };
    }, [userId, roomId, navigate]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages(files); // 직접 파일 저장
        console.log('[확장] 이미지 선택 완료:', files.length);
    };

    const uploadImages = async (files) => {
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));
        console.log('[확장] 이미지 업로드 요청 시작');
        try {
            const response = await fetch('/api/upload', { // 실제 엔드포인트로 수정
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            if (!response.ok) {
                const text = await response.text();
                throw new Error(`서버 응답 오류: ${response.status} - ${text}`);
            }
            const result = await response.json();
            console.log('[확장] 이미지 업로드 성공:', result);
            return result; // URL 배열 반환 가정
        } catch (error) {
            console.error('[확장] 이미지 업로드 실패:', error);
            throw error;
        }
    };

    const sendMessage = async () => {
        const isConnected = await ensureSocketConnected();
        if (!isConnected) {
            console.error('[확장] 소켓 연결 실패로 메시지 전송 중단');
            alert('메시지 전송 실패: 서버 연결 오류');
            return;
        }

        if (!input.trim() && !images.length) return;

        let imageUrls = null;
        if (images.length) {
            try {
                const uploadedUrls = await uploadImages(images);
                imageUrls = JSON.stringify(uploadedUrls);
            } catch (error) {
                console.error('[확장] 이미지 업로드 오류로 전송 중단:', error);
                alert('이미지 업로드 실패: ' + error.message);
                return;
            }
        }

        const sanitizedInput = input.trim().replace(/[\n\r\t]/g, ' ');
        const payload = {
            roomId: roomId.toString(),
            content: sanitizedInput || null,
            imageUrls: imageUrls
        };
        console.log('[확장] 전송 시도:', payload);
        socketRef.current.send(JSON.stringify(payload));
        setInput('');
        setImages([]);
    };

    const leaveChat = () => {
        console.log('[확장] 채팅방 떠나기 요청:', { roomId, userId });
        axios.post(`/api/chat/leave/${roomId}/${userId}`, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        }).then(() => {
            if (socketRef.current) socketRef.current.close();
            navigate('/chatrooms');
            console.log('[확장] 채팅방 떠나기 성공');
        }).catch(error => console.error('[확장] 목록 이동 실패:', error));
    };

    const deleteChatRoom = () => {
        if (!window.confirm('정말로 나가시겠습니까?')) return;
        console.log('[확장] 채팅방 삭제 요청:', { roomId, userId });
        axios.delete(`/api/chat/room/${roomId}/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        }).then(() => {
            if (socketRef.current) socketRef.current.close();
            navigate('/chatrooms', { replace: true });
            console.log('[확장] 채팅방 삭제 성공');
        }).catch(error => {
            console.error('[확장] 방 삭제 실패:', error);
            navigate('/chatrooms');
        });
    };

    const loadMore = () => {
        if (socketRef.current && hasMore && socketRef.current.readyState === WebSocket.OPEN) {
            console.log('[확장] 더 보기 요청:', { page: page + 1 });
            socketRef.current.send(JSON.stringify({ type: 'loadMore', roomId, page: page + 1 }));
            setPage(prev => prev + 1);
        } else {
            console.warn('[확장] 더 보기 요청 실패: 소켓 상태 비정상');
        }
    };

    const formatDate = (timestamp) => new Date(timestamp).toLocaleDateString('ko-KR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

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

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column', background: '#f7f7f7' }}>
            <div style={{ padding: '10px', background: '#ffeb33', textAlign: 'center', position: 'sticky', top: 0 }}>
                <h2>{targetUserId || 'Unknown'}</h2>
                <button onClick={leaveChat} style={{ position: 'absolute', right: '60px' }}>목록으로</button>
                <button onClick={deleteChatRoom} style={{ position: 'absolute', right: '10px', background: '#ff3333', color: 'white' }}>나가기</button>
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
                                    <img key={i} src={url} alt="chat" style={{ maxWidth: '100%' }} />
                                ))}
                                <span style={{ fontSize: '10px', color: '#888', display: 'block', textAlign: 'right' }}>
                                    {new Date(item.sentAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    )
                ))}
            </div>
            <div style={{ padding: '10px', background: '#fff', borderTop: '1px solid #ddd', display: 'flex', alignItems: 'center' }}>
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ marginRight: '10px' }} />
                <input value={input} onChange={(e) => setInput(e.target.value)} style={{ flex: 1, padding: '5px' }} placeholder="메시지를 입력하세요" />
                <button onClick={sendMessage} style={{ padding: '5px 10px', background: '#ffeb33' }}>전송</button>
            </div>
        </div>
    );
};

export default Chat;