import React, { useState, useEffect, useRef, use } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Chat = () => {
    //Redux에서 userId 가져오기
    const { userId } = useSelector(state => state.user);
    // 현재 위치에 대한 정보 ex) 이전 상태 데이터
    const { state } = useLocation();
    // 라우트에서 전달받은 상태
    const { targetUserId, roomId } = state;
    // WebSocket 연결
    const [socket, setSocket] = useState(null);
    // 메시지 목록이라서 배열로 생성
    const [messages, setMessages] = useState([]);
    // 텍스트 입력
    const [input, setInput] = useState('');
    // 선택된 이미지 (Base64)
    const [images, setImages] = useState([]);
    // 스크롤 하단 이동용 
    // 상태 값의 변경이 컴포넌트를 리렌더링하지 않도록 하기 위해 사용
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    // Websocket 연결 설정
    useEffect(() => {
        if (userId) {
            const ws = new WebSocket(`ws:localhost:8080/chat?userId=${userId}`);
            // onopen WebSocket이 성공적으로 열렸을 때 실행되는 콜백 함수
            ws.onopen = () => console.log('WebSocket Connected');
            // onmessage 서버에서 메시지가 수신되었을 때 호출 되는 콜백 함수
            ws.onmessage = (event) => {
                const date = JSON.parse(event.data);
                // 상태가 읽음 이라면
                if (date.type === 'read') {
                    // 읽음 상태 업데이트
                    // prev 보통 이전 상태 혹은 이전값을 나타내는 변수 이름
                    // 읽으면 특정 messageId를 가진 메시지의 read 값을 Y로 업데이트
                    setMessages(prev => prev.map(msg => msg.messageId === date.messageId ? { ...msg, read: 'Y' } : msg));
                } else {
                    // 새 메시지 추가
                    // 기존의 메시지에 data를 배열에 추가
                    setMessages(prev => [...prev, date]);
                    // 새로운 메시지를 받았을 때 발신자와 현재 사용자의 ID가 다르면
                    // 읽음 상태를 서버에 업데이트 하는 API 요청 역활
                    if (date.senderId !== userId) {
                        axios.post(
                            'http://localhost:8080/api/chat/read'
                            , {
                                roomId,
                                messageId: date.messageId,
                                userId
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                                }
                            })
                            .catch(error => console.error('Error marking as read:', error));
                    }
                }
            };
            // onclose WebSocket이 성공적으로 닫혔을 때 실행되는 콜백 함수
            ws.onclose = () => console.log('WebSocket Disconnected')
            setSocket(ws);
            //컴포넌트 언마운트 시 연결 종료
            return () => ws.close();
        }
    }, [userId, roomId]);

    //이미지 업로드 처리

    const handleImageUpload = (e) => {
        //파일을 선택하면 onChange 이벤트 발생하고
        //e.target.file는 선택한 파일들을 fileList 객체로 반환
        // 객체인데 배열이 아니므로 array.from으로 배열로 변환
        const files = Array.from(e.target.files);
        const imagePromises = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader(); // FileReader 객체 생성
                // 파일을 읽은 후, Base64로 변환된 결과를 반환
                reader.onload = (e) => resolve(e.target.result);
                //파일을 Base64로 열기
                reader.readAsDataURL(file);
            });
        });
        // 모든 파일이 읽히면 result Base64로 문자열이 들어옴
        Promise.all(imagePromises).then(result => setImages(result));
    }

    //메시지 전송 (텍스트와 이미지 같이)
    const sendMessage = () => {
        // WebSocket 연결이 되어있고, 입력 값이나 선택한 이미지가 있으면 메시지를 전송
        if (socket && (input.trim() || images.length > 0)) {

            //메시지 페이로드(전송할 데이터)생성
            const payload = {
                roomId: roomId.toStrign(), //채팅방 ID를 문자열로 변환하여 포함
                content: input.trim() || null, // 텍스트 입력값. 입력이 없으면 null
                imageUrls: images.length > 0 ? JSON.stringify(images) : null
                //선택된 이미지 배열. 이미지가 없으면 null로 설정
            };
            // WebSocket을 통해 서버로 메시지를 전송
            // 페이로드는 JSON 형식으로 문자열화 해서 전송
            socket.send(JSON.stringify(payload));

            // 메시지를 전송 한 후, 입력 필드와 이미지 배열 초기화
            setInput(''); //입력 초기화
            setImages([]); // 이미지 초기화
        }
    };

    //채팅방 나가기
    const leaveChat = () => {
        //서버로 post요청을 보내서 채팅방 나가는 API 호출
        axios.post(
            `http://localhost:8080/api/chat/leave/${roomId}/${userId}`,
            // {}은 값을 넘기는 객체이지만
            // 나갈때는 별도의 데이터는 필요하지 않고
            // URL에 RoomId와 userId 가 포함되어 있기 때문에
            // 저 정보만으로 충분히 요청이 처리 될 수 있음
            {},
            {
                headers: {
                    // Authorization 헤더에 저장된 accessToken을 포함하여
                    // 인증을 통과 하도록 설정
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            // 요청이 성공하면 홈 화면('/')으로 리디렉션
            .then(() => navigate('/'))
            // 요청이 실패하면 콘솔에 오류 메시지를 출력
            .catch(error => console.error('Error leaving chat :', error));
    }

    // 날짜 포맷팅
    const formatData = (timestamp) => {
        // timestamp를 받아서 새로운 Date 객체 생성
        const data = new Date(timestamp);
        // 'toLocalDateString' 메서드를 사용하여 날짜 형식을 지정
        // 'ko-kr'은 한국의 날짜형식 (yyyy년 mm월 dd일)을 적용합니다.
        return data.toLocalDataString(
            'ko-KR', //로케일 지정 (한국어) 뒤에는 KR
            {
                weekday: 'long', // 요일을 긴 형태로 출력 (ex: "월요일")
                year: 'numeric',  // 연도를 숫자로 출력 (ex: 2025)
                month: 'long',  // 월을 긴 형태로 출력 (ex: "3월")
                day: 'numeric' // 일을 숫자로 출력 (ex: "7")
            }
        )
    };

    // 날짜별 메시지 그룹화 및 구분선 추가
    const groupMessagesByDate = () => {
        // 날짜별로 메시지를 그룹화할 배열을 초기화
        const grouped = [];

        //마지막으로 처리한 날짜를 추적할 변수
        let lastDate = null;

        // 'messeges' 배열을 순회하면서 각 메시지를 처리
        // forEach는 배열의 각 요소에 대해 제공된 콜백 함수를 실행
        messages.forEach(msg => {
            //메시지의 'sendAt' 값을 날짜 형식으로 변환 (ex: '2025년 3월 7일')
            const msgData = formatData(msg.sendAt);

            // 현재 메시지의 날짜와 마지막 처리한 날짜가 다르면
            if (msgData !== lastDate) {
                // 새로운 날짜가 등장하면 날짜 항목을 그룹화 배열에 추가
                grouped.push({ type: 'date', value: msgData });
                //마지막 날짜를 현재 날짜로 업데이트
                lastDate = msgData;
            }
            // 해당 메시지를 'message' 타입으로 그룹화 배열에 추가
            grouped.push({ type: 'message', ...msg });
        });
        // 그룹화된 메시지 배열을 반환
        return grouped;
    }

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column', background: '#f7f7f7' }}>
            {/* 헤더: 상대방 이름 및 나가기 버튼 */}
            <div style={{ padding: '10px', background: '#ffeb33', textAlign: 'center', position: 'sticky', top: 0 }}>
                <h2>{targetUserId}</h2>
                <button onClick={leaveChat} style={{ position: 'absolute', right: '10px' }}>나가기</button>
            </div>
            {/* 메시지 영역 */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                {groupMessagesByDate().map((item, idx) => (
                    item.type === 'date' ? (
                        // 날짜 구분선
                        <div key={idx} style={{ textAlign: 'center', color: '#888', margin: '10px 0' }}>
                            <hr style={{ border: '1px solid #ddd' }} />
                            {item.value}
                        </div>
                    ) : (
                        // 메시지 말풍선
                        <div key={idx} style={{ display: 'flex', justifyContent: item.senderId === userId ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
                            <div style={{
                                maxWidth: '70%',
                                background: item.senderId === userId ? '#ffeb33' : '#fff',
                                padding: '8px 12px',
                                borderRadius: '10px',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                position: 'relative'
                            }}>
                                {/* 텍스트 메시지 */}
                                {item.content && <p style={{ margin: '0' }}>{item.content}</p>}
                                {/* 이미지 표시 */}
                                {item.imageUrls && JSON.parse(item.imageUrls).map((url, i) => (
                                    <img key={i} src={url} alt="chat" style={{ maxWidth: '100%', marginTop: '5px', borderRadius: '5px' }} />
                                ))}
                                {/* 시간 및 읽음 상태 */}
                                <span style={{ fontSize: '10px', color: '#888', display: 'block', textAlign: 'right' }}>
                                    {new Date(item.sentAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                                    {item.senderId === userId && (item.read === 'Y' ? ' 읽음' : '')}
                                </span>
                            </div>
                        </div>
                    )
                ))}
                <div ref={messagesEndRef} /> {/* 스크롤 하단 참조 */}
            </div>
            {/* 입력 영역 */}
            <div style={{ padding: '10px', background: '#fff', borderTop: '1px solid #ddd', display: 'flex', alignItems: 'center' }}>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ marginRight: '10px' }}
                />
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ flex: 1, padding: '5px', borderRadius: '5px', border: '1px solid #ddd' }}
                    placeholder="메시지를 입력하세요"
                />
                <button
                    onClick={sendMessage}
                    style={{ padding: '5px 10px', background: '#ffeb33', border: 'none', borderRadius: '5px', marginLeft: '5px' }}
                >
                    전송
                </button>
            </div>
        </div>
    );
};

export default Chat;