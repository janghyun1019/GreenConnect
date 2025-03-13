import React from 'react';
import dayjs from "dayjs";
import '../css/PostDetail.css'; // 스타일 파일이 필요하다면 유지

function PostDetailTop({
    postDetail,
    postDetailImages,
    currentImageIndex,
    setCurrentImageIndex,
    buyUser,
    handleEditClick,
    handleDeleteClick,
    handleReportClick,
    showReportPopup,
    reportContent,
    setReportContent,
    handleReportSubmit,
    handleCancelReport,
    buyCount,
    setBuyCount,
    totalPrice,
    totalGram,
    handleSubmit,
    handleCartSubmit,
    postJjim,
    handleSaveJjimSubmit,
    handleDeleteJjimSubmit,
}) {
    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === postDetailImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? postDetailImages.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="postDetailContainer">
            <div className="postDetailTitle">{postDetail.postTitle}</div>

            <div className="postDetailBtnBox">
                {buyUser?.userId === postDetail.userId ? (
                    <>
                        <button className="postDetailEditBtn" onClick={handleEditClick}>
                            수정하기
                        </button>
                        <button className="postDetailDeleteBtn" onClick={handleDeleteClick}>
                            삭제하기
                        </button>
                    </>
                ) : (
                    <button className="postDetailReportBtn" onClick={handleReportClick}>
                        신고하기
                    </button>
                )}
            </div>

            {/* 신고 팝업창 */}
            {showReportPopup && (
                <div className="reportPopup">
                    <div className="reportPopupContent">
                        <h2>신고하기</h2>
                        <p>
                            <strong>신고자: </strong> {buyUser?.userId}
                        </p>
                        <p>
                            <strong>신고 대상 닉네임: </strong> {postDetail.nickName}
                        </p>
                        <p>
                            <strong>게시글 제목: </strong> {postDetail.postTitle}
                        </p>
                        <textarea
                            placeholder="신고 사유를 입력하세요."
                            value={reportContent}
                            onChange={(e) => setReportContent(e.target.value)}
                        />
                        <div className="reportPopupButtons">
                            <button onClick={handleReportSubmit}>신고하기</button>
                            <button onClick={handleCancelReport}>취소하기</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="postDetailTop">
                <div className="postDetailTopImagesBox">
                    <button className="prevBtn" onClick={goToPreviousImage}>
                        이전
                    </button>
                    {postDetailImages && postDetailImages.length > 0 ? (
                        <img
                            src={postDetailImages[currentImageIndex]}
                            alt={`상품이미지 ${currentImageIndex + 1}`}
                        />
                    ) : (
                        <img src="/images/userImage.jpg" alt="이미지가 없습니다." />
                    )}
                    <button className="nextBtn" onClick={goToNextImage}>
                        다음
                    </button>
                </div>
                <div className="postDetailTopPtcrInfo">
                    <div>품목: {postDetail.postProductType}</div>
                    <div>판매자 닉네임: {postDetail.nickName}</div>
                    <div>판매자 주소: {postDetail.postSpot}</div>
                    <div>조회수: {Number(postDetail.postViews).toLocaleString()} 회</div>
                    <div>
                        판매글 작성일:{" "}
                        {dayjs(postDetail.postCreateAt).format("YYYY년 MM월 DD일")}
                    </div>
                    <div>
                        판매단위:{" "}
                        {postDetail.postSalesUnit <= 999
                            ? `${postDetail.postSalesUnit}g`
                            : `${(postDetail.postSalesUnit / 1000).toFixed(1)}kg`}
                    </div>
                    <div>가격: {Number(postDetail.postPrice).toLocaleString()} 원</div>
                    <div>배송비: {Number(postDetail.postCost).toLocaleString()} 원</div>
                    <form id="buyProductForm" onSubmit={handleSubmit}>
                        <div>
                            구매수량:
                            <input
                                className="buyCount"
                                type="number"
                                id="buyCount"
                                name="buyCount"
                                value={buyCount}
                                onChange={(e) => {
                                    let value = Number(e.target.value);
                                    if (value > 9999) {
                                        value = 9999;
                                    } else if (value < 0) {
                                        value = 0;
                                    }
                                    setBuyCount(value);
                                }}
                                required
                                placeholder="구매수량을 입력하세요."
                            />
                        </div>
                        <input type="hidden" name="boardId" value="1" />
                        <input type="hidden" name="postId" value={postDetail.postId} />
                        <input type="hidden" name="userId" value={buyUser?.userId || ""} />
                        <input type="hidden" name="nickName" value={buyUser?.nickname || ""} />
                        <input type="hidden" name="totalPrice" value={totalPrice} />
                        <input type="hidden" name="totalGram" value={totalGram} />
                    </form>
                    <div>
                        총 수량:{" "}
                        {(buyCount * postDetail.postSalesUnit) <= 999
                            ? `${Number(postDetail.postSalesUnit * buyCount)}g`
                            : `${(Number(postDetail.postSalesUnit * buyCount) / 1000).toLocaleString()}Kg`}
                    </div>
                    <div>총 금액 (배송비 포함): {totalPrice.toLocaleString()} 원</div>
                    <div className="JCBBtnBox">
                        {postJjim ? (
                            <button onClick={handleDeleteJjimSubmit}>찜 취소</button>
                        ) : (
                            <button onClick={handleSaveJjimSubmit}>찜 하기</button>
                        )}
                        <button>채팅</button>
                        <button onClick={handleSubmit}>바로구매</button>
                        <button onClick={handleCartSubmit}>장바구니</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetailTop;