import './css/PostDetailReview.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostDetailReviewModal from './PostDetailReviewModal';
import PostReviewSlider from './PostReviewSlider';
import axios from 'axios';



//리뷰 작성 페이지 만들기
// 결제 테이블 결제완료 한 사람만 글 작성 가능

//리뷰 불러오는 코드 만들기
//불러와서 화면에 띄우기
function PostDetailReview({ post }) {

    const navigate = useNavigate();

    const [buyUser, setBuyUser] = useState(null);
    const [buyInfo, setBuyInfo] = useState(null);
    const [reviewInfo, setReviewInfo] = useState([]);

    // 상태 관리
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    // 팝업 상태 관리
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 팝업 열기
    const openModal = () => {
        if (!buyUser) {
            if (window.confirm("로그인 후 작성 가능합니다. 로그인 하시겠습니까?")) {
                navigate("/login");
            }
        }
        if (buyInfo && buyInfo.userId == buyUser.userId && buyUser && buyInfo.payState == 'Y') {
            console.log("구매기록있음");
            setIsModalOpen(true);
        } else {
            alert("구매 기록이 있어야 후기작성이 가능합니다.");
        }
    };

    // 팝업 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        // 세션에서 사용자 정보 가져오기 (localStorage나 sessionStorage에서)
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // 세션에 저장된 사용자 정보 가져오기
        if (loggedInUser) {
            setBuyUser(loggedInUser);
        }
    }, []);

    // 컴포넌트가 마운트될 때 데이터 요청
    useEffect(() => {
        // 서버에서 데이터 가져오기
        if (!buyUser || !buyUser.userId || !post.postId) return;

        const fetchBuyInfo = async () => {

            try {
                const buyData = {
                    userId: buyUser.userId,
                    postId: post.postId
                }
                const response = await axios.post("/api/getBuyInfo",
                    buyData,
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
                console.log(response.data);
                setBuyInfo(response.data);
                setLoading(false); // 로딩 끝
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setError("해당 유저의 구매 정보가 없습니다.");
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBuyInfo();
    }, [buyUser, post.postId]); // postId가 변경되면 다시 실행

    useEffect(() => {
        // 서버에서 데이터 가져오기
        if (!post.postId) return;

        const fetchReviewInfo = async () => {

            try {

                const response = await axios.post("/api/getReviewInfo/" + post.postId);
                console.log(response.data);

                if (Array.isArray(response.data)) {
                    setReviewInfo(response.data);  // 배열이면 그대로 설정
                } else {
                    setReviewInfo([]);  // 배열이 아니면 빈 배열로 설정
                }

                setLoading(false); // 로딩 끝
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setError("해당 판매글의 후기 정보가 없습니다.");
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchReviewInfo();
    }, [buyUser, post.postId]); // postId가 변경되면 다시 실행

    return (
        <div className="postDetailBottomReviewMainContainer">
            <h1 style={{ margin: '30px 0' }}>별점 및 후기</h1>

            <PostReviewSlider reviewInfo={reviewInfo} />

            <div>
                <button onClick={openModal} style={{ width: '100px', height: '30px', backgroundColor: 'white', borderRadius: '8px', border: '2px solid gray', cursor: 'pointer', fontWeight: 'bold' }}>리뷰 작성하기</button>
            </div>

            {/* 리뷰 작성 팝업 */}
            <div style={{ margin: '30px 0px' }}>
                {isModalOpen && <PostDetailReviewModal closeModal={closeModal} post={post} buyUser={buyUser} buyInfo={buyInfo} />}
            </div>
        </div>
    )

}

export default PostDetailReview;