import '../css/PostDetail.css';

function PostDetail(){

    
    return(
        <div className='postDetailMainContainer'>
            <div className="postDetailContainer">


            <div className="postDetailTitle"> 메인 제목 </div>

            <div className='postDetailBtnBox'>
                <button className="postDetailEditBtn"> 수정하기 </button>
                <button className="postDetailDeleteBtn"> 삭제하기 </button>
                <button className='postDetailReportBtn'> 신고하기 </button>
            </div>

            <div className="postDetailTop">
                <div className="postDetailTopImagesBox"> 이미지 박스 </div>
                <div className="postDetailTopPtcrInfo">
                    <div>제목</div>
                    <div>가격</div>
                    <div>찜횟수,조회수,업로드날짜</div>
                    <div>상품정보</div>
                    <div>배송비</div>
                    <div>판매자 농장 주소(필요시공개)</div>
                    <div>판매자 닉네임</div>
                    <div>수량선택</div>
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