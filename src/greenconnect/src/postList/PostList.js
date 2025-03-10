import '../css/PostList.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostThumbnail from './PostThumbnail';


function PostList() {


    const navigate = useNavigate();

    // 포스트 정보
    const [postList, setPostList] = useState([]);
    const [postThumbnailImage, setPostThumbnailImage] = useState([]);

    // 상태 관리
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태


    useEffect(() => {
        // 서버에서 데이터 가져오기
        const fetchPostList = async () => {
            try {
                const response = await axios.get("/api/postList");
                setPostList(response.data); // 데이터 상태 업데이트
                console.log(response.data);
                setLoading(false); // 로딩 끝
            } catch (err) {
                setError(err.message); // 에러 상태 업데이트
                setLoading(false); // 로딩 끝
            }
        };

        fetchPostList();
    }, []);

    useEffect(() => {
        // 서버에서 이미지데이터 가져오기
        const fetchPostThumbnailImage = async () => {
            try {
                const response = await axios.get("/api/postThumnailImage");
                setPostThumbnailImage(response.data); // 데이터 상태 업데이트
                console.log(response.data);
                setLoading(false); // 로딩 끝
            } catch (err) {
                setError(err.message); // 에러 상태 업데이트
                setLoading(false); // 로딩 끝
            }
        };

        fetchPostThumbnailImage();
    }, []); // postId가 변경되면 다시 실행


    return (
        <div className='postListMainContainer'>
            <h1>판매글 리스트 페이지</h1>
            <div className='postListContainer'>

                {
                    postList.map((post) => (
                        <PostThumbnail post={post} />
                    ))
                }

            </div>
        </div>
    )

}


export default PostList;