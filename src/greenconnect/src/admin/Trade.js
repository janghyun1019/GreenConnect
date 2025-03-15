import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Link 추가

function Trade() {
    const [trades, setTrades] = useState([]);
    const [shippingUpdate, setShippingUpdate] = useState({ tradeId: '', deliveryStatus: '' });

    useEffect(() => {
        axios.get("/admin/trade/list")
            .then((response) => setTrades(response.data))
            .catch((error) => console.error("Error fetching trade list", error));
    }, []);

    function handlePayment(tradeId) {
        axios.post("/admin/trade/processPayment", { tradeId })
            .then(() => {
                alert("결제가 완료되었습니다.");
                window.location.reload();
            })
            .catch((error) => console.error("Error processing payment", error));
    }

    function handleRefund(tradeId) {
        axios.post("/admin/trade/processRefund", { tradeId })
            .then(() => {
                alert("환불이 완료되었습니다.");
                window.location.reload();
            })
            .catch((error) => console.error("Error processing refund", error));
    }

    function handleShippingUpdate() {
        axios.post("/admin/trade/updateShipping", shippingUpdate)
            .then(() => {
                alert("배송 상태가 업데이트되었습니다.");
                setShippingUpdate({ tradeId: "", deliveryStatus: "" });
                window.location.reload();
            })
            .catch((error) => console.error("Error updating shipping status", error));
    }

    return (
        <div>
            <div className="adminAside">
                <ul>
                <li><Link to="/Admin">관리자 홈</Link></li>
                <li><Link to="/Customer">사용자관리</Link></li>
                <li><Link to="/Trade">거래관리</Link></li>
                <li><Link to="/Quality">품질관리</Link></li>
                <li><Link to="/System">시스템설정</Link></li>
                <li><Link to="/CuSupport">고객지원</Link></li>
                </ul>
            </div>

            <div className="mainContainer">
                <h2 className="mainName">거래 관리</h2>
                <div className="mainContent">
                    <div>거래 ID</div>
                    <div>사용자 ID</div>
                    <div>결제 금액</div>
                    <div>결제 상태</div>
                    <div>배송 상태</div>
                    <div>작업</div>
                </div>
                {trades.map(trade => (
                    <div key={trade.tradeId} className="grid grid-cols-6 gap-4 border-b p-2">
                        <div>{trade.tradeId}</div>
                        <div>{trade.userId}</div>
                        <div>{trade.totalPrice}원</div>
                        <div>{trade.paymentStatus}</div>
                        <div>{trade.deliveryStatus}</div>
                        <div>
                            <button 
                                className="yButton"
                                onClick={() => handlePayment(trade.tradeId)}
                            >결제 완료</button>
                            <button 
                                className="nButton"
                                onClick={() => handleRefund(trade.tradeId)}
                            >환불 처리</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="shippingContainer">
                <h2 className="shippingName">배송 상태 변경</h2>
                <div className="shippingContent">
                    <input 
                        type="text" 
                        placeholder="거래 ID" 
                        value={shippingUpdate.tradeId} 
                        onChange={(e) => setShippingUpdate({ ...shippingUpdate, tradeId: e.target.value })}
                        className="border p-2"
                    />
                    <select 
                        value={shippingUpdate.deliveryStatus} 
                        onChange={(e) => setShippingUpdate({...shippingUpdate, deliveryStatus: e.target.value})}
                    >
                        <option value="">배송 상태 선택</option>
                        <option value="배송 준비중">배송 준비중</option>
                        <option value="배송 중">배송 중</option>
                        <option value="배송 완료">배송 완료</option>
                    </select>
                    <button 
                        className="changeButton"
                        onClick={handleShippingUpdate}
                    >변경</button>
                </div>
            </div>
        </div>
    );
}

export default Trade;