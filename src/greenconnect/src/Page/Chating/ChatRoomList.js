import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChatRoomList = () => {
    //Redux에서 userId 가져오기
    const { userId } = useSelector(state => state.user);
    //채팅방 목록 상태
    const [rooms, setRooms] = useState([]); //채팅방들 목록 상태 라서 []
    const [targetUserId, setTargetUserId] = useState(''); // 새 채팅방 상대방 ID 입력
    const navigate = useNavigate();

    //컴포넌트 마운트 시 채팅방 목록 조회
    useEffect(() => {
        if (userId) {
            axios.get(
                `http://localhost:8080/api/chat/rooms/${userId}
                `, {
                // 인증 헤더 추가
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
                .then(response => {
                    // 활성 상태인 채팅방만 필터링
                    // setRooms(response.data.filter(room => room.user1Active === 'Y' || room.user2Active === 'Y'));
                    // 모든 채팅방 표시 (활성 여부 상관없음)
                    setRooms(response.data);
                })
                .catch(error => console.error('Error fetching rooms:', error));
        }
    }, [userId]);

    // 채팅방 생성 함수 (*중복 방지 및 즉시 화면 반영*)
    const createChatRoom = () => {
        // 상대방 ID 비어있는지 확인
        if (!targetUserId.trim()) {
            // 상대방 ID가 비어있으면 경고창을 띄움
            alert('상대방 ID를 입력해주세요.');
            return;
        }
        // 기존 채팅방 확인
        const existingRoom = rooms.find(room =>
            // 기존에 채팅방을 찾기 위해서 userId와 targetUserId를 비교함
            // 첫 번째 조건 : userId가 userId1 이고 targetUserId가 userId2 인 경우
            (room.user1Id === userId && room.user2Id === targetUserId) ||
            // 두 번째 조건 : uesrId가 userId2 이고 ㅅtargetUserId가 userId1 인 경우
            (room.user1Id === targetUserId && room.user2Id === userId)
        );
        // 만약 기존에 해당 채팅방이 있으면
        if (existingRoom) {
            // 채팅방이 존재하는 경우, 해당 채팅방으로 이동 (채팅방 ID와 관련된 상태)
            //navigat()를 사용하여 채팅방 화면으로 이동
            // state를 사용해서 userId, targetUserId, roomId를 전달해서 해당
            //채팅창의 정보 렌더링
            navigate(`/chat/${existingRoom.roomId}`, {
                state: { userId, targetUserId, roomId: existingRoom.roomId }
            });
            // 채팅방을 찾았으므로, targetUserId를 비워서 초기화 
            setTargetUserId('');
            return;
        }

        // 새 채팅방 생성 요청
        axios.post('http://localhost:8080/api/chat/create',
            // 채팅방 생성에 필요한 데이터 (userId 와 targetUserId)
            { user1Id: userId, user2Id: targetUserId },
            //Authorization 헤더에 저장된 JWT 토큰을 추가하여 인증을 처리
            { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
        )
            .then(response => {
                //채팅방 생성 성공 후 서버로부터 받은 새 채팅창 정보
                const newRoom = response.data;
                // 새 채팅바을 rooms 배열에 추가
                // 이전 상태를 기반으로 새로운 채팅방을 추가하여 rooms 상태를 업데이트
                setRooms(prev => [...prev, newRoom]); // 즉시 화면에 반영 (*오늘 만든 방 표시*)

                // 새로 생성된 채팅방으로 이동
                //navigate 함수로 해당 채팅방의 ID를 URL 경로로 포함시켜서 이동
                // state를 통해 채팅방 정보를 전달하여 화면 렌더링에 활용
                navigate(`/chat/${newRoom.roomId}`, {
                    state: { userId, targetUserId, roomId: newRoom.roomId }
                });
                // 채팅방 생성 후 상대방 ID 입력 필드를 초기화
                setTargetUserId('');
            })
            // 채팅방 생성에 실패 한 경우 콘솔에 에러 메시지 출력
            .catch(error => console.error('Error creating chat room:', error));
    };

    return (
        //전체 컨테이너 스타일
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>채팅방 목록</h2>
            {/* 채팅방 목록 스타일 */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {rooms.map(room => (
                    // 룸들 매핑으로 여러가 띄움
                    // 채팅방 클릭 시 해당 채팅 페이지로 이동
                    <li
                        key={room.roomId}
                        onClick={() => navigate(`/chat/${room.roomId}`, {
                            state: { userId, targetUserId: room.user1Id === userId ? room.user2Id : room.user1Id, roomId: room.roomId }
                        })}
                        style={{ padding: '10px', borderBottom: '1px solid #ddd', cursor: 'pointer' }}
                    >
                        {room.user1Id === userId ? room.user2Id : room.user1Id} {/* 상대방 ID 표시 */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatRoomList;



//프로젝트 설정
//npx create-react-app carrot-chat
//cd carrot-chat
//npm install axios react-router-dom @reduxjs/toolkit react-redux
//npm start