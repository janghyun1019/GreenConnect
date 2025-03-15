import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// 공통
import Header from "../common/Header";
import Footer from "../common/Footer";
import Main from "../main/main";

// 필요한 컴포넌트 import
import Signup from "../Page/Signup/Signup";
import Login from "../Page/Signup/Login";
import FindId from "../Page/Signup/FindId";
import FindPassword from "../Page/Signup/FindPassword";
import ResetPassword from "../Page/Signup/ResetPassword"

import MarketInfo from "../Page/MarketInfo/MarketInfoPage";

function Merge() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <div className="merge-container">
                <Header />
                <Routes>
                    {/* 메인 및 인증 관련 페이지 */}
                    <Route path="/" element={<Main />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/FindId" element={<FindId />} />
                    <Route path="/FindPassword" element={<FindPassword />} />
                    <Route path="/ResetPassword" element={<ResetPassword />} />

                    {/* 추가된 페이지 */}
                    <Route path="/market-info" element={<MarketInfo />} />
                    
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default Merge;
