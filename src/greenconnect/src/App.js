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
          {/* 기존 라우트 */}
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/findId" element={<FindId />} />
          <Route path="/findPassword" element={<FindPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          {/* JH - 추가된 라우트 */}
          <Route path="/MarketInfoPage" element={<MarketInfoPage />} />
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