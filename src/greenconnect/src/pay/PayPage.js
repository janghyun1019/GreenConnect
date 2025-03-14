import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/PayPage.css';



function PayPage() {

    const { postId } = useParams();
    const navigate = useNavigate();

    // 데이터 불러온 것 상태 관리
    const [buyInfo, setBuyInfo] = useState(null);
    const [buyUser, setBuyUser] = useState(null);

    // 상태 관리
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    const truncateText = (text, maxLength) => { // 제목이 너무 길면 잘라냄
        return text.length > maxLength ? text.substring(0, maxLength) + ".." : text;
    };

    // 결제 input 입력한 정보들 담는 것들
    const [tradingType, setTradingType] = useState('commonTrading'); // 거래방식 택배, 만나서거래
    const [buyerAdress, setBuyerAdress] = useState(null); // 구매자 주소정보
    const [requestContent, setRequestContent] = useState(null); // 구매자 배송요청사항

    // 사용자 선택 상태관리
    const [paymentType, setPaymentType] = useState(''); // 결제수단 g-pay or 일반결제
    const [isApplied, setIsApplied] = useState(false); // 소득공제 신청 여부
    const [receiptType, setReceiptType] = useState(null); // 개인소득공제용 or 사업자증빙용
    const [commonPayType, setCommonPayType] = useState(null); // 카드결제 or 무통장입금

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
        if (!buyUser || !buyUser.userId || !postId) return;

        const fetchBuyInfo = async () => {

            try {
                const buyData = {
                    userId: buyUser.userId,
                    postId: postId
                }


                const response = await axios.post("/api/getBuyInfo",
                    buyData,
                    {
                        headers: { 'Content-Type': 'application/json' }
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

                {loading ? <p>로딩 중...</p> : error ? <p>{error}</p> : //데이터 불러오기 전 출력 방지
                    <div className='payProductInfoBox'>
                        <div className='payProductInfoTitle'>구매 상품 정보</div>
                        <div><img src={buyInfo.urlFilePath} style={{ width: '100px', borderRadius: '12px' }}></img></div>
                        <div>판매글 제목: {truncateText(buyInfo.postTitle, 10)}</div>
                        <div>총 구매 금액: {Number(buyInfo.totalPrice).toLocaleString()}원</div>
                    </div>
                }

                <div className='payTradingTypeBox'>
                    <div className='payTradingTypeTitle'>거래 방식 *</div>
                    <div><label><input type='radio' name='tradingType' value='commonTrading' checked={tradingType === 'commonTrading'} onChange={(e) => setTradingType(e.target.value)} /> 일반택배(선불)</label></div>
                    <div><label><input type='radio' name='tradingType' value='meetTrading' checked={tradingType === 'meetTrading'} onChange={(e) => setTradingType(e.target.value)} /> 만나서 거래(택배비 차감)</label></div> {/* 체크시 -postCost */}
                </div>

                <div className='payBuyerAdressBox'>
                    <div className='payBuyerAdressTitle'>배송지 *</div>
                    <div><input type='text' name='buyerAdress' maxLength='60' placeholder='배송받을 주소를 입력해 주세요.' onChange={(e) => setBuyerAdress(e.target.value)} /></div>
                </div>

                <div className='payRequestBox'>
                    <div className='payRequestTitle'>거래 요청사항</div>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'gray', padding: '0 0 5px 0' }}>판매자 및 배송기사에게 전달되는 요청사항이에요.</div>
                    <div><input type='text' name='requestContent' placeholder='예) 포장 꼼꼼하게 부탁드려요.' onChange={(e) => setRequestContent(e.target.value)} /></div>
                </div>

                <div className='paymentType'>
                    <div className='paymentTypeTitle'>결제수단 *</div>
                    <div><label><input type='radio' name='paymentType' value='gpay' checked={paymentType === 'gpay'} onChange={(e) => setPaymentType(e.target.value)} /> G-PAY 결제</label></div>
                    <div><label><input type='radio' name='paymentType' value='common' checked={paymentType === 'common'} onChange={(e) => setPaymentType(e.target.value)} /> 일반결제</label></div>
                </div>
                {paymentType === 'gpay' && (
                    <div className='selectGpayBox'>
                        <div>현재 G-PAY 잔액: 원</div>  {/* gpay정보 불러와서입력 */}
                        <div>결제 후 예상 G-PAY 잔액: 원</div>
                    </div>
                )}
                {paymentType === 'common' && (
                    <div className='selectCommonPayBox'>
                        <div className='commonPayTypeBox'>
                            <div className={`payOption ${commonPayType === 'card' ? 'selected' : ''}`} onClick={() => setCommonPayType('card')} >카드결제</div>
                            <div className={`payOption ${commonPayType === 'bankBook' ? 'selected' : ''}`} onClick={() => setCommonPayType('bankBook')} >무통장(가상계좌)</div>
                        </div>
                    </div>
                )}
                {commonPayType === 'card' && (
                    <div className='selectCardPay'>
                        
                    </div>
                )}
                {commonPayType === 'bankBook' && (
                    <div className='selectBankBookPay'>무통장결제시 띄우는 창</div>
                )}

                <div className='payTotalPriceBox'>
                    <div className='payTotalPriceTitle'>결제금액</div>
                    <div className='payTotalPriceCRBox'>
                        <div className='payTotalPriceContent'>
                            <div>상품금액</div>
                            <div>배송비</div>
                            <div>총 결제금액</div>
                        </div>
                        {loading ? <p>로딩 중...</p> : error ? <p>{error}</p> : //데이터 불러오기 전 출력 방지
                            <div className='payTotalPriceResult'>
                                <div>{Number(buyInfo.postPrice).toLocaleString()} 원</div>
                                <div>{tradingType == 'meetTrading' ? 0 : Number(buyInfo.postCost).toLocaleString()} 원</div>
                                <div>{(Number(buyInfo.postPrice) + (tradingType === 'meetTrading' ? 0 : Number(buyInfo?.postCost || 0))).toLocaleString()} 원</div>
                            </div>
                        }
                    </div>
                </div>

                <div className='payCashReceiptBox'>
                    <div className='payCashReceiptTitle'>현금 영수증</div>

                    {/* 신청 / 미신청 선택 */}
                    <div className='payCashReceiptRadioBox'>
                        <div
                            className={`radioBox ${isApplied ? 'selected' : ''}`}
                            onClick={() => setIsApplied(true)}
                        >신청</div>
                        <div
                            className={`radioBox ${!isApplied ? 'selected' : ''}`}
                            onClick={() => {
                                setIsApplied(false);
                                setReceiptType(null); // 신청 해제 시 타입 초기화
                            }}
                        >미신청</div>
                    </div>

                    {/* 신청 시만 표시 */}
                    {isApplied && (
                        <div>
                            {/* 개인소득공제용 / 사업자증빙용 선택 */}
                            <div className='receiptTypeBox'>
                                <div
                                    className={`radioBox ${receiptType === 'personal' ? 'selected' : ''}`}
                                    onClick={() => setReceiptType('personal')}
                                >개인소득공제용</div>
                                <div
                                    className={`radioBox ${receiptType === 'business' ? 'selected' : ''}`}
                                    onClick={() => setReceiptType('business')}
                                >사업자증빙용</div>
                            </div>

                            {/* 선택에 따라 정보 입력 박스 출력 */}
                            {receiptType === 'personal' && (
                                <div><input type='text' placeholder='휴대폰 번호를 입력해주세요. - 포함 / 예) 000-0000-0000' /></div>
                            )}

                            {receiptType === 'business' && (
                                <div><input type='text' placeholder='사업자등록번호를 입력해주세요. -포함 / 예) 123-45-67890' /></div>
                            )}
                        </div>
                    )}
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