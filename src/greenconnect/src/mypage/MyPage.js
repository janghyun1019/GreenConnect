import './css/MyPage.css';
function MyPage(){

    return(
        <div class="mypageContainer">
            <h2 class="mypageLogo">마이페이지</h2>
            <div class="mypageSide">
                <ul>
                    <li>프로필관리</li>
                    <li>장바구니</li>
                    <li>주소/결재수단 목록</li>
                    <li>작성글 목록</li>
                    <li>즐겨찾기/좋아요 목록</li>
                    <li>1:1채팅목록</li>
                    <li class="adminLink">관리자 페이지</li>
                </ul>
                <div class="dashboard">
                    <div class="card">
                        <div class="profile-image">사진</div>
                        <div class="profile-info">
                            <p>사용자 닉네임</p>
                            <p class="balance">g-pay 잔액: 000원</p>
                        </div>
                        <button>프로필 수정</button>
                        <button>금액 충전</button>
                    </div>
                    <div class="card">
                            개인정보
                            <button>수정</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPage;