// App.js

import Signup from "./Page/Signup/Signup.js";
import Login from "./Page/Signup/Login.js";
import FindId from "./Page/Signup/FindId.js";
import FindPassword from "./Page/Signup/FindPassword.js";
import ResetPassword from "./Page/Signup/ResetPassword.js";
import ChatRoomList from "./Page/Chating/ChatRoomList.js";
import Chat from "./Page/Chating/Chat.js";
import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';  // Router 제거
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "./store/store.js";

function App() {
  const { userId } = useSelector(state => state.user);

  return (
    <div>
      <h1>당근마켓 채팅</h1>
      <Routes>
        {/* 기본 경로: 로그인 화면 표시 */}
        <Route 
          path="/" 
          element={userId ? <Navigate to="/chatrooms" /> : <Login />} 
        />
        {/* 채팅방 목록: 로그인 후 접근 (*경로 변경*) */}
        <Route 
          path="/chatrooms" 
          element={userId ? <ChatRoomList /> : <Navigate to="/" />} 
        />
        {/* 채팅 화면: 로그인 필요 */}
        <Route 
          path="/chat/:roomId" 
          element={userId ? <Chat /> : <Navigate to="/" />}
        />
        {/* 기타 경로: 회원가입 및 비밀번호 찾기 등 */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
