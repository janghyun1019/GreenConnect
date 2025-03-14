import React from "react";
import { BrowserRouter, Route, Routes, useInRouterContext } from "react-router-dom";
import Signup from "./Page/Signup/Signup.js";
import Login from "./Page/Signup/Login.js";
import FindId from "./Page/Signup/FindId.js";
import FindPassword from "./Page/Signup/FindPassword.js";
import ResetPassword from "./Page/Signup/ResetPassword.js";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Main from "./main/main";
import MarketInfoPage from "./Page/MarketInfo/MarketInfoPage.js";
import NoticeBoard from "./Page/CustomerService/notice/noticeBoard.js";
import NoticeDetail from "./Page/CustomerService/notice/NoticeDetail.js";
import NoticeForm from "./Page/CustomerService/notice/NoticeForm.js";

function App() {
  const inRouter = useInRouterContext();
  const RouterWrapper = inRouter ? React.Fragment : BrowserRouter;

  return (
    <RouterWrapper basename={!inRouter ? process.env.PUBLIC_URL : undefined}>
      <div className="app-container">
        <Header />
        <Routes>
          {/* 메인 및 인증 관련 페이지 */}
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/find-id" element={<FindId />} />
          <Route path="/find-password" element={<FindPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* 추가된 페이지 */}
          <Route path="/market-info" element={<MarketInfoPage />} />
          <Route path="/notice" element={<NoticeBoard />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
          <Route path="/notice/new" element={<NoticeForm />} />
          <Route path="/notice/edit/:id" element={<NoticeForm />} />
        </Routes>
        <Footer />
      </div>
    </RouterWrapper>
  );
}

export default App;
