import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './css/PostDetailReviewModal.css';
import axios from 'axios';


function PostDetailReviewModal({ closeModal, post, buyInfo, buyUser }) {

    const navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    // 별점 선택 핸들러
    const handleRatingClick = (value) => {
        setRating(value);
    };

    // 후기 내용 변경
    const handleReviewTextChange = (e) => {
        setReviewText(e.target.value);
    };

    // 이미지 업로드
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); // 원본 파일 저장
            setPreview(URL.createObjectURL(file)); // 미리보기용 URL 저장
        }
    };

    // 리뷰 제출
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!buyUser) {
            if (window.confirm('로그인 후 구매 가능합니다. 로그인 하시겠습니까?')) {
                navigate("/login"); // 로그인 페이지로 이동
            }
            return;
        }

        if (rating == 0) {
            alert("별점을 선택 해 주세요.");
            return;
        }

        if (!reviewText) {
            alert("후기 내용을 작성 해 주세요.");
            return;
        }

        // 제출 확인 창
        if (!window.confirm("제출하시겠습니까?")) {
            return;
        }

        const formData = new FormData();
        formData.append('postId', post.postId);
        formData.append('userId', buyUser.userId);
        formData.append('userNickName', buyUser.nickname);
        formData.append('rating', rating);
        formData.append('reviewContent', reviewText);
        if (image) {
            formData.append('reviewImage', image); // 올바른 파일 추가
        }

        console.log("이미지 파일:", image);
        console.log("폼 데이터:", formData);
        
        axios.post('/api/writePostReview', formData)
        .then((response)=>{
            if(response.data.status === "success") {
                alert("후기가 등록 되었습니다!");
                console.log("성공: " + response.data);
            }else{
                alert(response.data.message);
            }
        })
        .catch((error)=>{
            console.log("에러: " + error);
            alert("후기 등록에 실패했습니다. 다시 시도해주세요.");
        });

        // 리뷰 작성 제출 후 팝업 닫기
        closeModal();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>리뷰 작성</h2>

                {/* 별점 */}
                <div>
                    <label>별점</label>
                    <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${rating >= star ? 'filled' : ''}`}
                                onClick={() => handleRatingClick(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>

                {/* 후기 내용 */}
                <div>
                    <label>후기 내용</label>
                    <textarea
                        value={reviewText}
                        onChange={handleReviewTextChange}
                        placeholder="후기를 작성해주세요"
                    />
                </div>

                {/* 후기 이미지 업로드 */}
                <div style={{ margin: '10px 0px' }}>
                    <label>후기 이미지</label>
                    <input type="file" name='file' onChange={handleImageChange} />
                    {image && <img src={preview} alt="미리보기" width="100" />}
                </div>

                {/* 버튼들 */}
                <div className="modal-buttons">
                    <button onClick={handleSubmit}>제출</button>
                    <button onClick={closeModal}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default PostDetailReviewModal;