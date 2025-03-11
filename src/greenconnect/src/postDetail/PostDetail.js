import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from "dayjs";
import '../css/PostDetail.css';


function PostDetail() {  // PostDetailIntro 위에 있는 화면

    const navigate = useNavigate();
    // 구매정보
    const [buyCount, setBuyCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalGram, setTotalGram] = useState(0);
    const [buyUser, setBuyUser] = useState(null);

    // 포스트 정보
    const { postId } = useParams();

    const [postDetail, setPostDetail] = useState(null); // 데이터를 저장할 상태
    const [postDetailImages, setPostDetailImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [postJjim, setPostJjim] = useState(false);

    // 신고 기능
    const [showReportPopup, setShowReportPopup] = useState(false);
    const [reportContent, setReportContent] = useState('');

    // 상태 관리
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태


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
        const fetchPostDetail = async () => {
            try {
                const response = await axios.get("/api/posts/" + postId);
                setPostDetail(response.data); // 데이터 상태 업데이트
                setLoading(false); // 로딩 끝
            } catch (err) {
                setError(err.message); // 에러 상태 업데이트
                setLoading(false); // 로딩 끝
            }
        };

        fetchPostDetail();
    }, [postId]); // postId가 변경되면 다시 실행

    useEffect(() => {
        // 서버에서 이미지데이터 가져오기
        const fetchPostDetailImages = async () => {
            try {
                const response = await axios.get("/api/posts/images/" + postId);
                setPostDetailImages(response.data); // 데이터 상태 업데이트
                setLoading(false); // 로딩 끝
            } catch (err) {
                setError(err.message); // 에러 상태 업데이트
                setLoading(false); // 로딩 끝
            }
        };

        fetchPostDetailImages();
    }, [postId]); // postId가 변경되면 다시 실행


    const goToNextImage = () => { //이미지 다음버튼
        setCurrentImageIndex((prevIndex) =>
            prevIndex === postDetailImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPreviousImage = () => { //이미지 이전버튼
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? postDetailImages.length - 1 : prevIndex - 1
        );
    };

    const handleEditClick = () => { // 수정하기 버튼 수정페이지로 이동
        if (window.confirm("판매글을 수정하시겠습니까?")) {
            navigate(`/modifyPostDetail/${postDetail.postId}`); // postId를 파라미터로 전달
        }
    };

    const handleDeleteClick = async () => { // 삭제하기 버튼 삭제 axios post 요청
        if (window.confirm("판매글을 삭제하시겠습니까?")) { // 실제 삭제가아닌 판매상태만 N으로 업데이트됨!!(데이터정책)
            try {
                const response = await axios.post("/api/deletePost/" + postId);

                if (response.status === 200) {
                    alert(response.data); // 성공 메시지 출력
                    navigate("/"); // 삭제 후 메인 페이지 이동
                } else {
                    alert("삭제 실패: " + response.data);
                }
            } catch (error) {
                console.error("삭제 오류:", error);
                alert("게시글 삭제 중 오류가 발생했습니다.");
            }
        }
    }

    const handleReportClick = () => { // 팝업 오픈
        if (!buyUser) {
            if (window.confirm('로그인 후 신고가 가능합니다. 로그인 하시겠습니까?')) {
                window.location.href = '/login'; // 로그인 페이지로 이동
            }
            return; // 로그인하지 않으면 함수 종료
        }
        setShowReportPopup(true);
    };

    const handleReportSubmit = async () => {  // 팝업 서밋
        if (!reportContent.trim()) {
            alert("신고 사유를 입력해주세요.");
            return;
        }

        if (window.confirm("신고하시겠습니까?")) {
            try {
                const reportData = { // 신고 데이터 저장
                    userId: buyUser?.userId,
                    reportedUserId: postDetail.userId,
                    reportedUserNickName: postDetail.nickName,
                    reportedPostId: postDetail?.postId,
                    reportContent: reportContent
                };

                console.log(reportData);

                const response = await axios.post('/api/postReport', reportData, {
                    headers: { 'Content-Type': 'application/json' }
                });


                if (response.data === "성공") {
                    console.log('성공:', response.data);
                    alert("신고가 접수되었습니다.");
                    setShowReportPopup(false);
                    setReportContent('');
                } else if (response.data === "실패") {
                    alert("신고 접수가 실패했습니다.");
                } else {
                    // 예기치 않은 응답 처리
                    alert('알 수 없는 오류가 발생했습니다.');
                }

            } catch (error) {
                alert("신고 접수 중 오류가 발생했습니다.");
            }
        }
    };

    const handleCancelReport = () => {
        if (window.confirm("취소하시겠습니까?")) {
            setShowReportPopup(false);
            setReportContent('');
        }
    };


    // 총 금액 자동 계산 (postPrice * buyCount + postCost)
    useEffect(() => {
        if (postDetail && postDetail.postPrice && postDetail.postCost && buyCount > 0) {
            const calculatedPrice = (postDetail.postPrice * buyCount) + Number(postDetail.postCost);
            setTotalPrice(calculatedPrice);
        } else {
            setTotalPrice(0); // postDetail이 아직 로딩되지 않았다면 총 금액을 0으로 설정
        }
    }, [buyCount, postDetail]);

    // 총 주문 량 계산 (postSalesUnit * buyCount)
    useEffect(() => {
        if (postDetail && postDetail.postSalesUnit && buyCount > 0) {
            const calculatedGram = Number(postDetail.postSalesUnit) * Number(buyCount);
            setTotalGram(calculatedGram);
        } else {
            setTotalGram(0);
        }
    }, [buyCount, postDetail]);


    const handleCartSubmit = async (e) => { // 장바구니 버튼 클릭시 실행
        e.preventDefault(); // 기본 폼 제출 방지
        // 로그인 확인
        if (!buyUser) {
            if (window.confirm('로그인 후 담기가 가능합니다. 로그인 하시겠습니까?')) {
                window.location.href = '/login'; // 로그인 페이지로 이동
            }
            return; // 로그인하지 않으면 함수 종료
        }

        // 구매 수량 확인
        if (!buyCount || buyCount <= 0) {
            alert('구매수량을 선택 해 주세요.');
            return;
        }

        // 구매 확인 창
        if (!window.confirm("장바구니에 담으시겠습니까?")) {
            return; // 취소하면 함수 종료
        }

        try {
            // Data 생성
            const data = {
                userId: buyUser.userId,
                nickName: buyUser.nickname,
                boardId: 1,
                postId: postDetail.postId,
                buyCount: buyCount,
                totalPrice: totalPrice,
                totalGram: totalGram,
            };

            console.log(data);

            // 백엔드 API로 데이터 전송
            const response = await axios.post('/api/buyProduct', data, {
                headers: {
                    'Content-Type': 'application/json', // JSON 형식으로 보내기
                }
            });

            if (response.data === "성공") {
                alert("해당 상품이 장바구니에 담겼습니다!");
                console.log('성공:', response.data);
                if (window.confirm("장바구니로 이동 하시겠습니까?")) {
                    navigate("/"); // 장바구니 이동 으로 수정해야함@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                }

            } else if (response.data === "실패") {
                alert("구매 요청이 실패했습니다.");
            } else {
                // 예기치 않은 응답 처리
                alert('알 수 없는 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('에러:', error); // 에러 처리
            alert('구매 요청에 실패했습니다. 다시 시도해주세요.');
        }
    };


    const handleSubmit = async (e) => { // 바로구매 버튼 클릭시 실행
        e.preventDefault(); // 기본 폼 제출 방지
        // 로그인 확인
        if (!buyUser) {
            if (window.confirm('로그인 후 구매 가능합니다. 로그인 하시겠습니까?')) {
                window.location.href = '/login'; // 로그인 페이지로 이동
            }
            return; // 로그인하지 않으면 함수 종료
        }

        // 구매 수량 확인
        if (!buyCount || buyCount <= 0) {
            alert('구매수량을 선택 해 주세요.');
            return;
        }

        // 구매 확인 창
        if (!window.confirm("구매하시겠습니까?")) {
            return; // 취소하면 함수 종료
        }

        try {
            // Data 생성
            const data = {
                userId: buyUser.userId,
                nickName: buyUser.nickname,
                boardId: 1,
                postId: postDetail.postId,
                buyCount: buyCount,
                totalPrice: totalPrice,
                totalGram: totalGram,
            };

            console.log(data);

            // 백엔드 API로 데이터 전송
            const response = await axios.post('/api/buyProduct', data, {
                headers: {
                    'Content-Type': 'application/json', // JSON 형식으로 보내기
                }
            });

            if (response.data === "성공") {
                alert("결제페이지로 이동!");
                console.log('성공:', response.data);
                navigate("/"); // 결제페이지 이동 으로 수정해야함@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            } else if (response.data === "실패") {
                alert("구매 요청이 실패했습니다.");
            } else {
                // 예기치 않은 응답 처리
                alert('알 수 없는 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('에러:', error); // 에러 처리
            alert('구매 요청에 실패했습니다. 다시 시도해주세요.');
        }
    };


    useEffect(() => { // 여기서 찜데이터(postId,userId) 불러온것으로 찜한지안한지 비교한다
        const fetchPostJjim = async () => {
            if (!buyUser || !buyUser.userId) {
                return;
            }
            console.log("jjimPostId: ", postId);
            console.log("jjimUserId: ", buyUser.userId);
            const jjimData = {
                postId: postId,
                userId: buyUser.userId
            }
            try {
                // 서버에서 데이터 가져오기
                const response = await axios.post("/api/getPostJjim",
                    jjimData
                    ,
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
                console.log('최초 postjjim : ');
                console.log(response.data); // 찜 했으면 데이터나옴, 안했으면 빈값
                if(response.data == null || response.data == '' ){
                    console.log("찜 안한 상태");
                    setPostJjim(false); // 안했으면 false로 찜버튼 상태관리(찜하기 출력)
                } else {
                    console.log("찜 한 상태");
                    setPostJjim(true); // 했으면 true로 찜버튼 상태관리(찜취소 출력)
                }
                setLoading(false); // 로딩 끝
            } catch (err) {
                setError(err.message); // 에러 상태 업데이트
                setLoading(false); // 로딩 끝
            }
        };
        fetchPostJjim();
    }, [buyUser, postId]);


    const handleSaveJjimSubmit = async () => {  // 찜 하기
        if (!buyUser) {
            if (window.confirm('로그인 후 가능합니다. 로그인 하시겠습니까?')) {
                window.location.href = '/login'; // 로그인 페이지로 이동
            }
            return; // 로그인 안하면 종료
        }
        console.log(buyUser.userId);
        console.log(postId);
        try {
            const JjimData = {
                userId: buyUser.userId,
                postId: postId
            }
            
            // 찜 추가
            const response = await axios.post('/api/savePostJjim', JjimData, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.data === "jjimOk") {
                alert("해당 판매글을 찜 하였습니다!");
                console.log("찜성공!!!");
                console.log(response.data);
                setPostJjim(true); // 찜 상태 업데이트
            } else if (response.data == "jjimFail") {
                alert("찜 추가에 실패했습니다.");
            } else {
                alert("알 수 없는 오류가 발생했습니다.");
            }
            
        } catch (error) {
            alert("이미 찜 한 상품입니다.");
        }
    }


    const handleDeleteJjimSubmit = async () => { // 찜 취소 하기
        console.log(buyUser.userId);
        console.log(postId);
        try {
            const JjimData = {
                userId: buyUser.userId,
                postId: postId
            }
            
            if (postJjim) {
                    // 찜 취소
                    const response = await axios.post('/api/deletePostJjim', JjimData, {
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (response.data === "jjimDeleteOk") {
                        alert("찜이 취소되었습니다.");
                        console.log("찜취소성공!!!");
                        setPostJjim(false); // 찜 취소 후 상태 업데이트
                    } else if (response.data == "jjimDeleteFail") {
                        alert("찜 취소에 실패했습니다.");
                    } else {
                        alert("알 수 없는 오류가 발생했습니다.");
                    }
            }
        } catch (error) {
            alert("찜 취소에 실패했습니다.");
        }
    }


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!postDetail) return <div>No post details available.</div>;


    return (
        <div className='postDetailMainContainer'>
            <div className="postDetailContainer">

                <div className="postDetailTitle"> {postDetail.postTitle} </div>

                <div className='postDetailBtnBox'>
                    {buyUser?.userId === postDetail.userId ? (
                        <>
                            <button className="postDetailEditBtn" onClick={handleEditClick}> 수정하기 </button>
                            <button className="postDetailDeleteBtn" onClick={handleDeleteClick}> 삭제하기 </button>
                        </>
                    ) : (
                        <button className='postDetailReportBtn' onClick={handleReportClick}> 신고하기 </button>
                    )}
                </div>

                {/* 신고 팝업창 */}
                {showReportPopup && (
                    <div className="reportPopup">
                        <div className="reportPopupContent">
                            <h2>신고하기</h2>
                            <p><strong>신고자: </strong> {buyUser?.userId}</p>
                            <p><strong>신고 대상 닉네임: </strong> {postDetail.nickName}</p>
                            <p><strong>게시글 제목: </strong> {postDetail.postTitle}</p>
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
                        <button className='prevBtn' onClick={goToPreviousImage}>이전</button>
                        {postDetailImages && postDetailImages.length > 0 ? (
                            // 이미지가 있을 경우
                            <img
                                src={postDetailImages[currentImageIndex]}
                                alt={`상품이미지 ${currentImageIndex + 1}`}
                            />
                        ) : (
                            // 이미지가 없을 경우 유저이미지 표시
                            <img
                                src="/images/userImage.jpg"
                                alt="이미지가 없습니다."
                            />
                        )}
                        <button className='nextBtn' onClick={goToNextImage}>다음</button>
                    </div>
                    <div className="postDetailTopPtcrInfo">
                        {/* <div>제목: {postDetail.postTitle}</div> 위쪽에 이미 제목이있어서 일단 제거함 */}
                        <div>품목: {postDetail.postProductType}</div>
                        <div>판매자 닉네임: {postDetail.nickName}</div>
                        <div>판매자 주소: {postDetail.postSpot}</div>
                        <div>조회수: {Number(postDetail.postViews).toLocaleString()} 회</div>
                        <div>판매글 작성일: {dayjs(postDetail.postCreateAt).format("YYYY년 MM월 DD일")}</div>
                        <div>판매단위: {
                            postDetail.postSalesUnit <= 999
                                ? `${postDetail.postSalesUnit}g`
                                : `${(postDetail.postSalesUnit / 1000).toFixed(1)}kg`
                        }
                        </div>
                        <div>가격: {Number(postDetail.postPrice).toLocaleString()} 원</div>
                        <div>배송비: {Number(postDetail.postCost).toLocaleString()} 원</div>
                        <form id="buyProductForm" action="" method="post" onSubmit={handleSubmit}>
                            <div>구매수량:
                                <input className='buyCount'
                                    type="number"
                                    id="buyCount"
                                    name="buyCount"
                                    value={buyCount}
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        setBuyCount(value);
                                    }}
                                    required
                                    placeholder="구매수량을 입력하세요."
                                    min="0"
                                />
                            </div>
                            <input type="hidden" name="boardId" value="1" />
                            <input type="hidden" name="postId" value={postDetail.postId} /> {/* 현재주문하고있는 포스트아이디 */}
                            <input type="hidden" name="userId" value={buyUser?.userId || ""} /> {/* 구매자 아이디 */}
                            <input type="hidden" name="nickName" value={buyUser?.nickname || ""} /> {/* 구매자 닉네임 */}
                            <input type="hidden" name="totalPrice" value={totalPrice} /> {/* 총주문금액 */}
                            <input type="hidden" name="totalGram" value={totalGram} /> {/* 총주문량 */}
                        </form>
                        <div>총 수량: {
                            (buyCount * postDetail.postSalesUnit) <= 999
                                ? `${Number(postDetail.postSalesUnit * buyCount)}g`
                                : `${(Number(postDetail.postSalesUnit * buyCount) / 1000).toLocaleString()}Kg`
                        }</div>
                        <div>총 금액 (배송비 포함): {totalPrice.toLocaleString()} 원</div>
                        <div className='JCBBtnBox'>
                            {
                                postJjim ? 
                                    <button onClick={handleDeleteJjimSubmit}>찜 취소</button>
                                    : 
                                    <button onClick={handleSaveJjimSubmit}>찜 하기</button>
                                    
                            }
                            <button>채팅</button>
                            <button onClick={handleSubmit}>바로구매</button>
                            <button onClick={handleCartSubmit}>장바구니</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}


export default PostDetail;