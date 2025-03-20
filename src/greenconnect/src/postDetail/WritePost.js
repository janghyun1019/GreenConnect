import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './css/WritePost.css';

function WritePost() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [productType, setProductType] = useState('');
    const [content, setContent] = useState('');
    const [salesUnit, setSalesUnit] = useState('');
    const [price, setPrice] = useState('');
    const [spot, setSpot] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [address1, setAdress1] = useState('');
    const [address2, setAdress2] = useState('');
    const [cost, setCost] = useState('');
    const [storeId, setStoreId] = useState('');
    const [images, setImages] = useState([]); // 여러 이미지를 관리할 상태 추가
    const [user, setUser] = useState(null);
    const [currentTime, setCurrentTime] = useState('');

    // 우편 주소 검색
    const [adressError, setAdressError] = useState({});
    const [isLoadingAdress, setIsLoadingAdress] = useState(false);
    const [address, setAddress] = useState(null);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        // 세션에서 사용자 정보 가져오기 (localStorage나 sessionStorage에서)
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // 세션에 저장된 사용자 정보 가져오기
        if (loggedInUser) {
            setUser(loggedInUser);
        }

        // 현재 시간을 설정 (한국 시간 포맷)
        const now = new Date();
        setCurrentTime(now.toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); // 기본 폼 제출 방지

        if (!user) {
            if (window.confirm('로그인 후 작성 가능합니다. 로그인 하시겠습니까?')) {
                window.location.href = '/login'; // 로그인 페이지로 이동
            }
            return; // 로그인하지 않았으면 폼 제출 방지
        }

        if(!postalCode || !address1) {
            window.alert('우편번호 및 기본주소를 선택 해 주세요');
            return;
        }

        // 컨펌 창 띄우기
        const isConfirmed = window.confirm("저장하시겠습니까?");
        if (isConfirmed) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('productType', productType);
            formData.append('content', content);
            formData.append('salesUnit', salesUnit);
            formData.append('price', price);
            const fullAddress =`${postalCode} ${address1} ${address2}`.trim();
            formData.append('spot', fullAddress);
            formData.append('cost', cost);
            formData.append('storeId', storeId);

            console.log(postalCode);
            console.log(address1);

            // 이미지 배열 처리
            images.forEach((image) => {
                formData.append('postImages', image); // 'postImages'라는 이름으로 서버로 전송
            });

            formData.append('userId', user.userId);
            formData.append('nickName', user.nickname);
            formData.append('boardId', 1);


            // 백엔드 API로 데이터 전송
            axios.post('/api/saveWritePost', formData)
                .then((response) => {
                    if (response.data.status === "success") {
                        alert("게시글이 등록되었습니다!");
                        console.log('성공:', response.data); // 서버 응답 데이터 처리
                        navigate("/postList"); // 저장 후 메인 이동
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error('에러:', error); // 에러 처리
                    alert('게시글 저장에 실패했습니다. 다시 시도해주세요.');
                });

        } else {
            return; // 취소 시 아무것도 하지 않음
        }
    };

    // 이미지 선택 후 상태에 추가하는 함수
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // 선택된 파일들
        setImages(files); // 상태에 파일들 저장
    };

    // 취소 버튼 클릭 시 /main으로 이동 (컨펌창 추가)
    const handleCancel = () => {
        const isConfirmed = window.confirm("취소하시겠습니까?");
        if (isConfirmed) {
            navigate("/postList"); // 취소 후 /main 페이지로 이동
        } else {
            // 취소 시 아무것도 하지 않음
            return;
        }
    };

    // 우편주소api
    const searchPostalCode = () => {
        if (!window.daum || !window.daum.Postcode) {
            const script = document.createElement('script');
            script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
            script.onload = () => openPostcode();
            document.head.appendChild(script);
        } else {
            openPostcode();
        }
    };

    const openPostcode = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                setPostalCode(data.zonecode)
                setAdress1(data.roadAddress || data.jibunAddress)
            }
        }).open();
    };


    return (
        <div className="writePostContainer">
            <div className="postMainTitle">판매글 작성</div>

            {/* 작성자 정보 */}
            <div className="userInfoBox">
                <div>작성자: {user ? user.nickname : '익명'}</div>
                <div className="currentTime">현재시간: {currentTime}</div>
            </div>

            {/* 게시글 작성 폼 */}
            <form id="writePostForm" action="" method="post" onSubmit={handleSubmit}>
                <input type="hidden" name="boardId" value="1" />
                {user && (
                    <>
                        <input type="hidden" name="userId" value={user.userId} />
                        <input type="hidden" name="nickName" value={user.nickname} />
                    </>
                )}

                <div className="postProductType">품목 :
                    <input
                        type="text"
                        id="productType"
                        name="productType"
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                        required
                        placeholder="품목을 입력하세요 (예시: 감자, 옥수수, 당근)"
                        maxLength="33"
                    />
                </div>

                <div className="postTitle">제목 :
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="제목을 입력하세요 (최대 25글자 까지 입력가능.)"
                        maxLength="25"
                    />
                </div>

                <div className="postContent">내용 :
                    <textarea
                        id="content"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="5"
                        required
                        placeholder="내용을 입력하세요 (최대 1000글자 까지 입력가능. 내용은 첨부 한 이미지 하단에 출력됩니다.)"
                        maxLength="1000"
                    ></textarea>
                </div>

                <div className='postSalesUnit'>판매단위 :
                    <input
                        type="number"
                        id="salesUnit"
                        name="salesUnit"
                        value={salesUnit}
                        onChange={(e) => setSalesUnit(e.target.value)}
                        required
                        placeholder="판매 단위를 입력하세요. < 단위: g ( 1kg = 1000g ), 숫자만 입력 가능. >"
                        min="0"
                        max="99999999"
                    />
                </div>

                <div className='postPrice'>판매가격 :
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        placeholder="판매단위당 판매가격을 입력하세요 (숫자만 입력가능.)"
                        min="0"
                        max="99999999"
                    />
                </div>

                <div className="writeBuyerAdressBoxApi">
                        <label>우편번호 *</label>
                        <div className="write-postal-code-container">
                            <input
                                type="text"
                                name="postal_code"
                                placeholder="우편번호 검색"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                className={adressError.postal_code ? 'error' : ''}
                                readOnly
                                required
                            />
                            <button style={{padding:'5px', margin:'5px 0 5px 0', backgroundColor:'white',fontWeight:'bold' , borderRadius:'5px'}}
                                type="button"
                                className="write-search-button"
                                onClick={searchPostalCode}
                            >
                                우편번호 검색
                            </button>
                        </div>
                        {adressError.postal_code && <span className="error-text">{adressError.postal_code}</span>}
                    

                    <div className="write-postal-code-container">
                        <label>기본 주소 *</label>
                        <input
                            type="text"
                            name="address1"
                            placeholder="우편번호를 검색 해 주세요."
                            value={address1}
                            onChange={(e) => setAdress1(e.target.value)}
                            className={adressError.address1 ? 'error' : ''}
                            readOnly
                            required
                        />
                        {adressError.address1 && <span className="error-text">{adressError.address1}</span>}
                    </div>

                    <div className="write-postal-code-container">
                        <label>상세 주소</label>
                        <input
                            type="text"
                            name="address2"
                            value={address2}
                            placeholder="상세 주소를 입력 해 주세요."
                            onChange={(e) => setAdress2(e.target.value)}
                            required
                        />
                    </div>
                </div>
                {/* <div className='postSpot'>농장주소 :
                    <input
                        type="text"
                        id="spot"
                        name="spot"
                        value={spot}
                        onChange={(e) => setSpot(e.target.value)}
                        required
                        placeholder="농장주소를 입력하세요."
                        maxLength="100"
                    />
                </div> */}

                <div className='postCost'>배송비 :
                    <input
                        type="number"
                        id="cost"
                        name="cost"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        required
                        placeholder="배송비를 입력하세요."
                        min="0"
                        max="99999999"
                    />
                </div>

                <div className='postStoreId'>농장이름 :
                    <input
                        type="text"
                        id="storeId"
                        name="storeId"
                        value={storeId}
                        onChange={(e) => setStoreId(e.target.value)}
                        required
                        placeholder="농장이름을 입력하세요. (예시: 순이네 농장)"
                        maxLength="100"
                    />
                </div>

                <div className="postImageUpload">사진 업로드 :
                    <input
                        type="file"
                        id="postImages"
                        name="postImages"
                        multiple
                        onChange={handleImageChange} // 이미지 선택 시 상태 업데이트
                    />
                    {images.length === 0 && ( // 이미지 선택시 사라짐
                        <div className='postImageUploadText'>
                            (최대한 500x500 사이즈의 사진을 업로드 해 주세요.)
                        </div>
                    )}
                </div>

                <div className='postImageUploadList'>
                    {/* 선택한 이미지 미리보기 */}
                    {images.length > 0 && (
                        <div>
                            <div>선택된 이미지:</div>
                            <ul>
                                {images.map((image, index) => (
                                    <li key={index}>{image.name}</li> // 이미지 이름만 표시
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <button className='saveBtn' type='submit'>저장</button>
                <button className="cancelBtn" type="button" onClick={handleCancel}>
                    취소
                </button>
            </form>
        </div>
    );
}

export default WritePost;