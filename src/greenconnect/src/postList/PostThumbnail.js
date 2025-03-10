import '../css/PostThumbnail.css';
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from "dayjs";


function PostThumbnail({ post }) {

    const navigate = useNavigate();

    console.log(post);


    const handleThumbnailClick = () => {
        navigate("/postDetail/" + post.postId); // postId를 포함한 URL로 이동
    };


    const truncateText = (text, maxLength) => { // 제목이 너무 길면 잘라냄
        return text.length > maxLength ? text.substring(0, maxLength) + ".." : text;
    };


    return (
        <div className='postThumbnailMainContainer'>
            <div className='postThumbnailContainer'>
                <div className='thumbnailBox' onClick={handleThumbnailClick}>
                    <div className='thumbnailImgBox'>
                        {
                            post.urlFilePath ?
                                <img src={post.urlFilePath} alt='상품 이미지' /> :
                                <img src="/images/userImage.jpg" alt='썸네일 없음 기본이미지' />
                        }
                    </div>
                    <div className='thumbnailTextBox'>
                        <div className='productTitle'>{truncateText(post.postTitle, 10)}</div>
                        <div className='productInfo'>
                            <div>상품 품목: {truncateText(post.postProductType, 10)}</div>
                            <div>상품 가격: {Number(post.postPrice).toLocaleString()}원</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default PostThumbnail;