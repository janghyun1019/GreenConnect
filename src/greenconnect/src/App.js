import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useInRouterContext,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Main from "./main/main";
import Signup from "./Page/Signup/Signup.js";
import Login from "../src/Page/Signup/Login.js";
import FindId from "./Page/Signup/FindId.js";
import FindPassword from "./Page/Signup/FindPassword.js";
import ResetPassword from "./Page/Signup/ResetPassword.js";
import GoogleAuthHandler from "./Page/Signup/GoogleAuthHandler.js";
import KakaoAuthHandler from "./Page/Signup/KakaoAuthHandler.js";
import NaverAuthHandler from "./Page/Signup/NaverAuthHandler.js";

import Header from "./common/Header";
import Footer from "./common/Footer";

function App() {
  const { userId } = useSelector((state) => state.user);

  // useInRouterContext 로 이미 BrowserRouter 내부인지 확인
  const inRouter = useInRouterContext();
  const RouterWrapper = inRouter ? React.Fragment : BrowserRouter;

  return (
    <RouterWrapper basename={!inRouter ? process.env.PUBLIC_URL : undefined}>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          {/*
          <Route
            path="/"
            element={userId ? <Navigate to="/TestMain" /> : <Login />}
          />
          <Route
            path="/TestMain"
            element={userId ? <TestMain /> : <Navigate to="/" />}
          />
          */}
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/find-id" element={<FindId />} />
          <Route path="/find-password" element={<FindPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* OAuth 콜백 */}
          <Route
            path="/auth/google/callback"
            element={<GoogleAuthHandler />}
          />
          <Route
            path="/auth/kakao/callback"
            element={<KakaoAuthHandler />}
          />
          <Route
            path="/auth/naver/callback"
            element={<NaverAuthHandler />}
          />
        </Routes>
        <Footer />
      </div>
    </RouterWrapper>
  );
}

export default App;
