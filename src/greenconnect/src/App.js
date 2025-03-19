import Signup from "./Page/Signup/Signup.js";
import Login from "./Page/Signup/Login.js";
import FindId from "./Page/Signup/FindId.js";
import FindPassword from "./Page/Signup/FindPassword.js";
import ResetPassword from "./Page/Signup/ResetPassword.js";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TestMain from "./Page/TestMain.js";
import GoogleAuthHandler from "./Page/Signup/GoogleAuthHandler.js";
import KakaoAuthHandler from "./Page/Signup/KakaoAuthHandler.js";
import NaverAuthHandler from "./Page/Signup/NaverAuthHandler.js";

function App() {
  const { userId } = useSelector((state) => state.user);

  return (
    <div>
      <h1>그커마켓</h1>
      <Routes>
        <Route
          path="/"
          element={userId ? <Navigate to="/TestMain" /> : <Login />}
        />
        <Route
          path="/TestMain"
          element={userId ? <TestMain /> : <Navigate to="/" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/auth/google/callback" element={<GoogleAuthHandler />} /> {/* 추가 */}
        <Route path="/auth/kakao/callback" element={<KakaoAuthHandler />} />
        <Route path="/auth/naver/callback" element={<NaverAuthHandler />} />
      </Routes>
    </div>
  );
}

export default App;