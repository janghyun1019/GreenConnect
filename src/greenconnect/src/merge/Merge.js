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

import PostDetail from "../postDetail/PostDetail";
import PostDetailIntro from "../postDetail/PostDetailIntro";
import MainPage from "../mainpageTemp1111/MainPage";
import WritePost from "../postDetail/WritePost";
import PostList from "../postList/PostList.js";
import PostThumbnail from "../postList/PostThumbnail.js";
import FindId from "../Page/Signup/FindId.js";
import FindPassword from "../Page/Signup/FindPassword.js";
import ResetPassword from "../Page/Signup/ResetPassword.js";
import ModifyPostDetail from "../postDetail/ModifyPostDetail.js";
import PostDetailReview from "../postDetail/PostDetailReview.js";
import PayPage from "../pay/PayPage.js";
import GpayChargePage from "../pay/GpayChargePage.js";

function Merge() {

    return (

        <div className="merge-container">
            <Routes>


                <Route path="/" element={<MainPage />} />
                <Route path="/main" element={<MainPage />} />

                <Route path="/writePost" element={<WritePost />} />
                <Route path="/postDetail/:postId" element={<PostDetail />} />
                <Route path="/postDetailReview/:postId" element={<PostDetailReview />} />
                <Route path="/modifyPostDetail/:postId" element={<ModifyPostDetail />} />
                <Route path="/postDetailIntro" element={<PostDetailIntro />} />
                <Route path="/postList" element={<PostList />} />
                <Route path="/postThumbnail" element={<PostThumbnail />} />

                <Route path="/payPage/:postId" element={<PayPage />} />
                {/* <Route path="/gpayChargePage" element={<GpayChargePage />} /> */}


                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/findId" element={<FindId />} />
                <Route path="/findPassword" element={<FindPassword />} />
                <Route path="/resetPassword" element={<ResetPassword />} />


                <Route path="/Mypage" element={<MyPage />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/Address" element={<Address />} />
                <Route path="/Post" element={<Post />} />
                <Route path="/likes" element={<Likes />} />
                <Route path="/Chat" element={<Chat />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/userinfo" element={<UserInfo />} />
                <Route path="/Admin" element={<Admin />} />
                <Route path="/Customer" element={<Customer />} />
                {/*<Route path="/Trade" element={<Trade/>} />
                <Route path="/Quality" element={<Quality/>} />
                <Route path="/System" element={<System/>} />
                <Route path="/CuSupport" element={<CuSupport/>} /> */}

            </Routes>
        </div>

    );
}

export default Merge;
