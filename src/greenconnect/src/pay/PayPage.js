import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/PayPage.css';




function PayPage() {

    const { postId } = useParams();

    // 데이터 불러온 것 상태 관리
    const [buyInfo, setBuyInfo] = useState(null);
    const [buyUser, setBuyUser] = useState(null);

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
        const fetchBuyInfo = async () => {

            if(!buyUser || !buyUser.userId || !postId){
                return;
            }

            const buyData = {
                userId: buyUser.userId,
                postId: postId
            }

            try {
                const response = await axios.post("/api/getBuyInfo",
                    buyData,
                    {
                        headers: {'Content-Type': 'application/json'}
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
    }, [buyUser, postId]); // postId가 변경되면 다시 실행


    return (
        <div className="payPageMainContainer">
            <h1>결제페이지</h1>
            <div className='payPageContainer'>

                <div className='payProductInfoBox'>
                    <div className='payProductInfoTitle'>구매 상품 정보</div>
                    <div>판매글 이미지: {buyInfo.urlFilePath}</div>
                    <div>판매글 제목: {buyInfo.postTitle}</div>
                    <div>총 구매 금액: {buyInfo.totalPrice}</div>
                </div>

                <div className='payTradingTypeBox'>
                    <div className='payTradingTypeTitle'>거래 방식</div>
                    <div>라디오: 일반택배(선불)</div>
                    <div>라디오: 만나서 거래(택배비 차감)</div> {/* 체크시 -postCost */}
                </div>

                <div className='payBuyerAdressBox'>
                    <div className='payBuyerAdressTitle'>배송지</div>
                    <div>인풋박스 홀더: 배송받을 주소를 입력해 주세요.</div>
                </div>

                <div className='payRequestBox'>
                    <div className='payRequestTitle'>거래 요청사항</div>
                    <div>판매자 및 배송기사에게 전달되는 요청사항이에요.</div>
                    <div>인풋박스 홀더: 예) 포장 꼼꼼하게 부탁드려요.</div>
                </div>

                <div className='paymentType'>
                    <div paymentTypeTitle>결제수단</div>
                    <div>라디오: G-PAY 결제</div>
                    <div>라디오: 일반결제</div>
                </div>
                <div className='selectGpayBox'>  {/* 결제수단 체크따라 화면표시 */}
                    <div>지페이 결제</div>
                </div>
                <div className='selectCommonPayBox'>  {/* 결제수단 체크따라 화면표시 */}
                    <div>일반결제</div>
                    <div className='CommonPayTypeBox'>
                        <div>카드결제</div>
                        <div>무통장(가상계좌)</div>
                    </div>
                </div>

                <div className='payTotalPriceBox'>
                    <div className='payTotalPriceTitle'>결제금액</div>
                    <div>결제금액 정보 창</div>
                </div>

                <div className='payCashReceiptBox'>
                    <div className='payCashReceiptTitle'>현금 영수증</div>
                    <div>라디오: 신청</div>
                    <div>라디오: 미신청</div>

                    <div>라디오: 개인소득공채용</div>
                    <div>라디오: 사업자증빙용</div>

                    <div>인풋박스: 휴대폰 번호를 입력해주세요.</div>
                    <div>인풋박스: 사업자등록번호를 입력해주세요.</div>
                </div>

                <div className='payAgreeBox'>
                    <div>체크박스전체선택: 아래 내용에 전체 동의해요.</div>
                    <div className='payAgreeUnit'>
                        <div>그린커넥트 서비스 이용약관 동의(필수)</div>
                        <div>결제대행 서비스 이용약관 동의(필수)</div>
                        <div>개인정보 수집 및 이용 동의(필수)</div>
                        <div>개인정보 제3자 제공 동의(필수)</div>
                    </div>
                    <div className='payAgreeUnitDetail'>
                        <div>자세히</div>
                        <div>자세히</div>
                        <div>자세히</div>
                        <div>자세히</div>
                    </div>
                </div>

                <div className='paySubmitBtnBox'>
                    <div>결제하기</div>
                </div>

                <div className='payBottomTextBox'>
                    <div>그린커넥트는 통신판매중개자이며...그린커넥트에게귀속합니다.</div>
                </div>
                
            </div>

        </div>
    )

}

export default PayPage;