import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostDetail from '../postDetail/PostDetail';
import '../css/PostDetailIntro.css';
import axios from 'axios';
import dayjs from "dayjs";


function PostDetailIntro() { // PostDetail 아래에 내용과 이미지 나오는 화면

    const navigate = useNavigate();

    return(
        <>
        <PostDetail />


        <div className='postDetailIntroMainContainer'>
            
            <h1>네비바</h1>
            <h1>상품소개</h1>

        </div>


        </>
    )

}


export default PostDetailIntro;