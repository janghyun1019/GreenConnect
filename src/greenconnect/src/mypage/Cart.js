import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Cart.css";
import Sidebar from "./components/Sidebar";

function Cart() {
    const [buyItems, setBuyItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBuyItems();
    }, []);

    const fetchBuyItems = async () => {
        setLoading(true);
        setError(null);

        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("accessToken");

        console.log("Fetching buy items - userId:", userId, "token:", token);

        if (!userId || !token) {
            setError("로그인이 필요합니다.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                "/api/getBuyInfosByUserId",
                { userId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("Buy items response:", response.data);
            setBuyItems(response.data || []);
        } catch (err) {
            if (err.response) {
                if (err.response.status === 401) {
                    setError("인증 실패: 다시 로그인해주세요.");
                } else if (err.response.status === 404) {
                    setError("구매 내역이 없습니다.");
                } else {
                    setError(`구매 내역 조회 실패: ${err.response.status} - ${err.response.data}`);
                }
            } else {
                setError("서버 연결 오류: 백엔드가 실행 중인지 확인하세요.");
            }
            console.error("Error fetching buy items:", err.response || err);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => {
        return buyItems.reduce((total, item) => total + parseInt(item.totalPrice || 0), 0);
    };

    const payProduct = async (item) => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("accessToken");

        if (!userId || !token) {
            setError("로그인이 필요합니다.");
            return;
        }

        try {
            const response = await axios.post(
                "/api/payProduct",
                { ...item, userId, paymentType: "gPay" },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("Payment response:", response.data);
            if (response.data === "성공") {
                setBuyItems(
                    buyItems.map((i) =>
                        i.postId === item.postId ? { ...i, payState: "Y" } : i
                    )
                );
                alert("결제가 완료되었습니다.");
            } else {
                alert("결제에 실패했습니다.");
            }
        } catch (err) {
            console.error("Error paying product:", err);
            alert("결제 중 오류가 발생했습니다.");
        }
    };

    if (loading) {
        return (
            <div className="Cart-container">
                <p>로딩 중...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="Cart-container">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="Cart-container">
            <div className="sidebar-section">
                <Sidebar />
            </div>
            <div className="main-content">
                <h1>구매 내역</h1>
                <div>
                    <h2>구매 목록</h2>
                    <div className="card">
                        {buyItems.length === 0 ? (
                            <p className="empty-message">구매 내역이 없습니다.</p>
                        ) : (
                            <div className="cart-items">
                                {buyItems.map((item) => (
                                    <div className="cart-item" key={item.postId}>
                                        <div className="item-details">
                                            <div className="item-title">
                                                {item.postTitle || item.postId} - 구매
                                            </div>
                                            <div className="item-price">
                                                총 가격: {parseInt(item.totalPrice || 0).toLocaleString()}원
                                            </div>
                                            <div className="item-quantity">
                                                구매 수량: {item.buyCount}
                                            </div>
                                            <div className="item-meta">
                                                판매자: {item.postNickName || item.postUserId}
                                            </div>
                                            <div className="item-meta">
                                                결제 상태: {item.payState === "Y" ? "결제 완료" : "결제 미완료"}
                                            </div>
                                            {item.payState === "N" && (
                                                <button
                                                    className="action-btn pay"
                                                    onClick={() => payProduct(item)}
                                                >
                                                    결제하기
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <div className="cart-summary">
                                    <span className="summary-text">총 구매 금액:</span>
                                    <span className="total-price">
                                        {calculateTotal().toLocaleString()}원
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;