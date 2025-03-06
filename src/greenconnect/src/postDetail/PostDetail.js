import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from "dayjs";
import '../css/PostDetail.css';


function PostDetail({ postId }) {

    const [postDetail, setPostDetail] = useState(null); // 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태


    // 컴포넌트가 마운트될 때 데이터 요청
    useEffect(() => {
        // 서버에서 데이터 가져오기
        const fetchPostDetail = async () => {
            try {
                const response = await axios.get("/api/posts/" + 13); // 백엔드 API URL
                setPostDetail(response.data); // 데이터 상태 업데이트
                setLoading(false); // 로딩 끝
            } catch (err) {
                setError(err.message); // 에러 상태 업데이트
                setLoading(false); // 로딩 끝
            }
        };

        fetchPostDetail();
    }, [postId]); // postId가 변경되면 다시 실행

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!postDetail) return <div>No post details available.</div>;


    return (
        <div className='postDetailMainContainer'>
            <div className="postDetailContainer">


                <div className="postDetailTitle"> {postDetail.postTitle} </div>

                <div className='postDetailBtnBox'>
                    <button className="postDetailEditBtn"> 수정하기 </button>
                    <button className="postDetailDeleteBtn"> 삭제하기 </button>
                    <button className='postDetailReportBtn'> 신고하기 </button>
                </div>

                <div className="postDetailTop">
                    <div className="postDetailTopImagesBox"> 이미지 박스 </div>
                    <div className="postDetailTopPtcrInfo">
                        <div>제목: {postDetail.postTitle}</div>
                        <div>품목: {postDetail.postProductType}</div>
                        <div>판매자 닉네임: {postDetail.nickName}</div>
                        <div>판매자 주소: {postDetail.postSpot}</div>
                        <div>조회수: {postDetail.postViews}</div>
                        <div>판매글 작성일: {dayjs(postDetail.postCreateAt).format("YYYY년 MM월 DD일")}</div>
                        <div>가격: {postDetail.postPrice} 원</div>
                        <div>배송비: {postDetail.postCost} 원</div>
                        <div>구매수량 selectBox</div>
                        <div className='JCBBtnBox'>
                            <div>찜</div>
                            <div>채팅</div>
                            <div>바로구매</div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}


export default PostDetail;