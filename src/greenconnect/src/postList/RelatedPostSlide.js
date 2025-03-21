import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedPostThumbnail from './RelatedPostThumbnail';

function RelatedPostSlide({relatedData}) {


    // 포스트 정보
    const [postList, setPostList] = useState([]);


    // 슬라이드
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
            const relatedDataApi = relatedData;
            console.log(relatedData);
            try {
                const response = await axios.get("/api/postListByRelatedData", {
                    params: { relatedData }, // 쿼리 파라미터로 전달
                });
                setPostList(response.data); // 데이터 상태 업데이트
                console.log(response.data);
                setLoading(false); // 로딩 끝
            } catch (err) {
                console.log("잘못된요청");
                setError(err.message); // 에러 상태 업데이트
                setLoading(false); // 로딩 끝
            }
        };

        fetchPostList();
    }, []);


    return (

                <div className='slidePostListContainer' style={{maxWidth:'100%'}}>
                    <button className='slidePostListPrevBtn' onClick={prevSlide}>이전</button>
                    <div className="slidePostListWrapper">
                        <div
                            className="slidePostListSlider"
                            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
                        >
                            {postList.map((post, index) => (
                                <RelatedPostThumbnail key={index} post={post} />
                            ))}
                        </div>
                    </div>
                    <button className='slidePostListNextBtn' onClick={nextSlide}>다음</button>
                </div>

    )


}

export default RelatedPostSlide;