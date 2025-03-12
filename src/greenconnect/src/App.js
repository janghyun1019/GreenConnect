import React from "react";
import Signup from "./Page/Signup/Signup.js";
import Login from "./Page/Signup/Login.js";
import FindId from "./Page/Signup/FindId.js";
import FindPassword from "./Page/Signup/FindPassword.js";
import ResetPassword from "./Page/Signup/ResetPassword.js";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { BrowserRouter, Route, Routes, useInRouterContext } from "react-router-dom";
import Main from "./main/main";
import MarketInfo from "./Page/MarketInfo/MarketInfo.js"; // 기존 페이지
import MarketInfoFullPage from "./Page/MarketInfo/MarketInfoFullPage.js"; // 추가된 페이지
import MarketInfoPage from "./Page/MarketInfo/MarketInfoPage.js"; // 추가된 페이지

function App() {
  // 이미 Router 컨텍스트 내에 있는지 확인합니다.
  const inRouter = useInRouterContext();
  const RouterWrapper = inRouter ? React.Fragment : BrowserRouter;

  return (
    <RouterWrapper basename={!inRouter ? process.env.PUBLIC_URL : undefined}>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          {/* 기존 라우트 */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/findId" element={<FindId />} />
          <Route path="/findPassword" element={<FindPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/marketInfo" element={<MarketInfo />} />
          {/* 추가된 라우트 */}
          <Route path="/marketInfoFull" element={<MarketInfoFullPage />} />
          <Route path="/MarketInfoPage" element={<MarketInfoPage />} />
        </Routes>
        <Footer />
      </div>
    </RouterWrapper>
  );
}

export default App;
