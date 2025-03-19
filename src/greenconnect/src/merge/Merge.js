import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostDetail from "../postDetail/PostDetail";
import PostDetailIntro from "../postDetail/PostDetailIntro";
import MainPage from "../mainpageTemp1111/MainPage";
import WritePost from "../postDetail/WritePost";
import PostList from "../postList/PostList.js";
import PostThumbnail from "../postList/PostThumbnail.js";
import ModifyPostDetail from "../postDetail/ModifyPostDetail.js";
import PostDetailReview from "../postDetail/PostDetailReview.js";
import PayPage from "../pay/PayPage.js";
import CommonPay from "../pay/CommonPay.js";
import GpayCharge from "../pay/GpayCharge.js";

import Signup from "../Page/Signup/Signup.js";
import Login from "../Page/Signup/Login.js";
import FindId from "../Page/Signup/FindId.js";
import FindPassword from "../Page/Signup/FindPassword.js";
import ResetPassword from "../Page/Signup/ResetPassword.js";
import PostDetailReviewModal from '../postDetail/PostDetailReviewModal.js';
import PostReviewSlider from '../postDetail/PostReviewSlider.js';

function Merge() {

    return (

        <div className="merge-container">
            <Routes>


                <Route path="/" element={<MainPage />} />
                <Route path="/main" element={<MainPage />} />

                <Route path="/writePost" element={<WritePost />} />
                <Route path="/postDetail/:postId" element={<PostDetail />} />
                <Route path="/postDetailReview/:postId" element={<PostDetailReview />} />
                <Route path="/postDetailReviewModal/:postId" element={<PostDetailReviewModal />} />
                <Route path="/postReviewSlider" element={<PostReviewSlider />} />
                <Route path="/modifyPostDetail/:postId" element={<ModifyPostDetail />} />
                <Route path="/postDetailIntro" element={<PostDetailIntro />} />
                <Route path="/postList" element={<PostList />} />
                <Route path="/postThumbnail" element={<PostThumbnail />} />

                <Route path="/payPage/:postId" element={<PayPage />} />
                <Route path="/commonPay" element={<CommonPay />} />
                <Route path="/gpayCharge" element={<GpayCharge />} />

                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/findId" element={<FindId/>} />
                <Route path="/findPassword" element={<FindPassword/>} />
                <Route path="/resetPassword" element={<ResetPassword/>} />

            </Routes>
        </div>

    );
}

export default Merge;