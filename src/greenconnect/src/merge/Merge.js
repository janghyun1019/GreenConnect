import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyPage from "../mypage/MyPage";
import Cart from "../mypage/Cart";
import Address from "../mypage/Address";
import Post from "../mypage/Post";
import Likes from "../mypage/Likes";
import Chat from "../mypage/Chat";
import Admin from "../mypage/Admin";
import Profile from '../mypage/Profile';
import UserInfo from '../mypage/UserInfo';
import Login from '../Page/Signup/Login';
import Signup from '../Page/Signup/Signup';
function Merge() {

    return (
        
            <div className="merge-container">
            <Routes>
                <Route path="/" element={<MyPage />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/Address" element={<Address />} />
                <Route path="/Post" element={<Post />} />
                <Route path="/likes" element={<Likes />} />
                <Route path="/Chat" element={<Chat />} />
                <Route path="/Admin" element={<Admin />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/userinfo" element={<UserInfo />}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Routes>
            </div>
        
    );
}

export default Merge;
