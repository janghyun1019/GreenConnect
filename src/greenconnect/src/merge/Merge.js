import React from 'react';
import Header from "../header/Header";
import './Merge.css';
import Body from '../pages/Body';
import MyPage from '../myPage/MyPage';
import MySetting from '../myPage/MySetting';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainFooter from '../footer/MainFooter';
import HeaderTotal from './HeaderTotal';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import InterestPage from '../pages/InterestPage';
import HotCatecoryPage from '../pages/CategoryPages/HotCategoryPage';
import NewCatecoryPage from '../pages/CategoryPages/NewCategoryPage';
import OpenStandBy from '../pages/CategoryPages/OpenStandBy';
import CloseStandBy from '../pages/CategoryPages/CloseStandBy';
import { useState } from 'react';
import Rank from '../pages/Rank';
import ScrollToTop from './ScrollToTop';
import Datas from '../particularpage/data/Datas';
import Ptcrpg from '../particularpage/Ptcrpg';
import UpdatePage from '../particularpage/pages/UpdatePage';
import CommuPage from '../particularpage/pages/CommuPage';
import ReviewPage from '../particularpage/pages/ReviewPage';

function Merge() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <ScrollToTop />
            <div className="merge-container">
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <Routes>
                    <Route path='/' element={<Body isLoggedIn={isLoggedIn} />} />
                    <Route path='/hot' element={<HotCatecoryPage/>} />
                    <Route path='/new' element={<NewCatecoryPage/>} />
                    <Route path='/openstandby' element={<OpenStandBy/>} />
                    <Route path='/closestandby' element={<CloseStandBy/>} />
                    <Route path='/ptcr/:id' element={<Ptcrpg datas={Datas} />} />
                    <Route path='/planpage/:id' element={<Ptcrpg datas={Datas} />} />
                    <Route path='/updatepage/:id' element={<UpdatePage datas={Datas} />} />
                    <Route path='/commupage/:id' element={<CommuPage datas={Datas} />} />
                    <Route path='/reviewpage/:id' element={<ReviewPage datas={Datas} />} />                
                    <Route path='/login' element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>} /> {/* 로그인 */}
                    <Route path="/signup" element={<SignupPage />} /> {/* 회원가입 */}
                    <Route path='/mypage' element={<MyPage isLoggedIn={isLoggedIn} />} /> {/* 마이페이지 */}
                    <Route path='/mysetting' element={<MySetting />} />
                    <Route path="/interest" element={<InterestPage isLoggedIn={isLoggedIn} />} /> {/* 선호 */}
                    <Route path='/rank' element={< Rank />} /> {/* 인기 */}
                </Routes>
                <MainFooter />
            </div>
        </Router>
    );
}

export default Merge;
