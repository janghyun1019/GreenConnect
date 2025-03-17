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
                <Route path="/commonPay" element={<CommonPay />} />
                {/* <Route path="/gpayChargePage" element={<GpayChargePage />} /> */}

            </Routes>
        </div>

    );
}

export default Merge;