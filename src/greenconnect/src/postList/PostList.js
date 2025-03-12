import '../css/PostList.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostThumbnail from './PostThumbnail';


function PostList() {

    const navigate = useNavigate();

    // 포스트 정보
    const [postList, setPostList] = useState([]);
    const [visibleCount, setVisibleCount] = useState(9); // 처음에는 9개만 표시


    // 슬라이드
    //const [slideThumbnail, setSlideThumbnail] = useState([]); //프리미엄고객들 포스트 이미지 불러와서 넣을예정 @@@@
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;
    const [isSliding, setIsSliding] = useState(false); // 애니메이션 상태

    const prevSlide = () => {
        if (isSliding) return; // 애니메이션 중이면 클릭 방지
        setIsSliding(true);
        setTimeout(() => setIsSliding(false), 300); // 애니메이션 끝난 후 다시 활성화

        setCurrentIndex((prev) => (prev === 0 ? Math.max(0, postList.length - itemsPerPage) : prev - itemsPerPage));
    };

    const nextSlide = () => {
        if (isSliding) return;
        setIsSliding(true);
        setTimeout(() => setIsSliding(false), 300);

        setCurrentIndex((prev) => (prev + itemsPerPage >= postList.length ? 0 : prev + itemsPerPage));
    };


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


    const loadMore = () => {
        setVisibleCount(prev => prev + 9); // 9개씩 추가
    };


    return (
        <div className='postListMainContainer'>
            <h1>판매글 리스트 페이지</h1>

            <div className='pmPostListContainerTitle'>
                <h2>프리미엄 고객의 판매상품 리스트</h2> {/* 고객정보가 primium인 post db에서 가져와야함 */}
                <div className='pmPostListContainer'>
                    <button className='pmPostListPrevBtn' onClick={prevSlide}>이전</button>
                    <div className="pmPostListWrapper">
                        <div
                            className="pmPostListSlider"
                            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
                        >
                            {postList.map((post, index) => (
                                <PostThumbnail key={index} post={post} />
                            ))}
                        </div>
                    </div>
                    <button className='pmPostListNextBtn' onClick={nextSlide}>다음</button>
                </div>
            </div>

            <div className='PostListContainerTitle'>
                <h2>일반 고객의 판매상품 리스트</h2>
                <div className='postListContainer'>
                    {
                        postList.slice(0, visibleCount).map((post) => (
                            <PostThumbnail post={post} />
                        ))
                    }
                </div>
            </div>

            {/* 더보기 버튼 (모든 게시글을 다 보여주면 버튼 숨김) */}
            {
                visibleCount < postList.length && (
                    <button onClick={loadMore} className="loadMoreButton">
                        더보기
                    </button>
                )
            }

            <div className='pmPostListContainerTitle'>
                <h2>추천 랜덤상품 리스트</h2> {/* 랜덤상품 db에서 가져와야함 */}
                <div className='pmPostListContainer'>
                    <button className='pmPostListPrevBtn' onClick={prevSlide}>이전</button>
                    <div className="pmPostListWrapper">
                        <div
                            className="pmPostListSlider"
                            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
                        >
                            {postList.map((post, index) => (
                                <PostThumbnail key={index} post={post} />
                            ))}
                        </div>
                    </div>
                    <button className='pmPostListNextBtn' onClick={nextSlide}>다음</button>
                </div>
            </div>

        </div>
    )

}


export default PostList;