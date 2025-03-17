import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyPage from "../mypage/MyPage";
import Cart from "../mypage/Cart";
import Address from "../mypage/Address";
import Post from "../mypage/Post";
import Likes from "../mypage/Likes";
import Chat from "../mypage/Chat";
import Profile from '../mypage/Profile';
import UserInfo from '../mypage/UserInfo';
import Admin from "../admin/Admin";
import Login from '../Page/Signup/Login';
import Signup from '../Page/Signup/Signup';
import Customer from '../admin/Customer';
import Trade from '../admin/Trade';
import Quality from '../admin/Quality';
import System from '../admin/System';
import CuSupport from '../admin/CuSupport';
function Merge() {

    return (
        
            <div className="merge-container">
            <Routes>
                <Route path="/Mypage" element={<MyPage />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/Address" element={<Address />} />
                <Route path="/Post" element={<Post />} />
                <Route path="/likes" element={<Likes />} />
                <Route path="/Chat" element={<Chat />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/userinfo" element={<UserInfo />}/>
                <Route path="/Admin" element={<Admin />} />
                <Route path="/Customer" element={<Customer />} />
                <Route path="/Trade" element={<Trade/>} />
                <Route path="/System" element={<System/>} />
                <Route path="/Quality" element={<Quality/>}/>
                <Route path="/CuSupport" element={<CuSupport/>}/>
                
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Routes>
            </div>
        
    );
}

export default Merge;
