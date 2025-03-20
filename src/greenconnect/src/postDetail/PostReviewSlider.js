import React, { useState } from 'react';

function PostReviewSlider({ reviewInfo }) {
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 리뷰 인덱스

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [selectedReview, setSelectedReview] = useState(null); // 선택된 리뷰

    // 다음 리뷰로 이동
    const nextSlide = () => {
        if (currentIndex < reviewInfo.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    // 이전 리뷰로 이동
    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // 리뷰 카드 클릭 핸들러
    const reviewCardHandle = (review) => {
        setSelectedReview(review);
        setIsModalOpen(true);
    };

    // 모달 닫기 함수
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedReview(null);
    };

    return (
        <div className="postReviewBox">
            <div className="postReviewInnerBox">
                {reviewInfo.length === 0 && <p>리뷰가 없습니다.</p>}
                <div className="postReviews" style={{ transform: `translateX(-${currentIndex * 320}px)` }}>
                    {reviewInfo.map((review) => (
                        <div className="postReviewCard" onClick={() => reviewCardHandle(review)}>
                            <p style={{ marginBottom: '5px' }}>작성자: {review.userNickName}</p>
                            {/* 별점 표시 */}
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={review.rating >= star ? 'filled' : 'empty'}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <p>{review.reviewContent.length > 10
                                ? `${review.reviewContent.substring(0, 13)}...`
                                : review.reviewContent}</p>
                            {review.urlFilePath && <img src={review.urlFilePath} alt="리뷰 이미지" />}
                        </div>
                    ))}
                </div>
                
                {/* 슬라이드 이동 버튼 */}
                {reviewInfo.length > 0 &&
                <div>
                    <button className="slide-button" onClick={prevSlide} disabled={currentIndex === 0}>
                        이전
                    </button>
                    <button className="slide-button" onClick={nextSlide} disabled={currentIndex === reviewInfo.length - 1}>
                        다음
                    </button>
                </div>
                }

            </div>
            {/* 모달창 */}
            {isModalOpen && selectedReview && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>리뷰 상세</h2>
                        <p>작성자: {selectedReview.userNickName}</p>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={selectedReview.rating >= star ? 'filled' : 'empty'}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <p>{selectedReview.reviewContent}</p>
                        {selectedReview.urlFilePath && (
                            <img src={selectedReview.urlFilePath} alt="리뷰 이미지" style={{ maxWidth: '100%' }} />
                        )}
                        <button onClick={closeModal}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostReviewSlider;