import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/MyPage.css';
import Sidebar from './components/Sidebar';
import { Navigate, useNavigate } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchCartItems();
        // fetchTransactions();
    }, []);
    
    const fetchCartItems = async () => {
        try {
            const userId = {
                userId: localStorage.getItem('userId')
            }
            const response = await axios.post('/api/getBuyInfo' , userId);
            setCartItems(response.data);
            setLoading(false);
        } catch (error) {
            console.error('장바구니 불러오기 실패:', error);
            setError('장바구니를 불러오는 중 오류가 발생했습니다.');
            setLoading(false);
        }
    };
    
    // const fetchTransactions = async () => {
    //     try {
    //         const userId = localStorage.getItem('userId');
    //         const response = await axios.get(`/transactions/${userId}`);
    //         setTransactions(response.data);
    //     } catch (error) {
    //         console.error('거래내역 불러오기 실패:', error);
    //     }
    // };
    
    // const updateQuantity = async (postId, newCount) => {
    //     if (newCount < 1) return;
        
    //     try {
    //         const userId = localStorage.getItem('userId');
    //         await axios.post(`/mypage/Cart/update`, {
    //             userId,
    //             postId,
    //             count: newCount
    //         }, {
    //             headers: { "Content-Type": 'application/json' }
    //         });

    //         setCartItems(cartItems.map(item => 
    //             item.postId === postId ? { ...item, count: newCount } : item
    //         ));
    //     } catch (error) {
    //         console.error('수량 업데이트 실패:', error);
    //     }
    // };
    
    const removeItem = async (postId) => {
        try {
            const deleteData = {
                userId: localStorage.getItem('userId'),
                postId: postId
            }
            await axios.post("/api/removeBuyInfo", deleteData,
                {
                    headers: { "Content-Type": 'application/json' }
                });
            console.log("삭제완료");
            window.location.reload();
            alert("삭제완료 하였습니다.");
        } catch (error) {
            console.error('아이템 삭제 실패:', error);
        }
    };
    
    const clearCart = async () => {
        try {
            const userId = {
                userId:  localStorage.getItem('userId')
            }
            await axios.post("/api/removeAllBuyInfo", userId, {
                headers: { "Content-Type": 'application/json' }
            });
            console.log("전체삭제완료");
            window.location.reload();
            alert("장바구니 전체삭제완료!");
        } catch (error) {
            console.error('장바구니 비우기 실패:', error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.postPrice * item.buyCount), 0);
    };

    if (loading) {
        return <div className="Cart-container"><p>로딩 중...</p></div>;
    }

    if (error) {
        return <div className="Cart-container"><p>{error}</p></div>;
    }
    return (
        <div className="Cart-container" style={{marginTop:'80px'}}>
            <div className="mypageSide">
                <Sidebar />
            </div>
            <div className="main-content">
            <h1>장바구니</h1>
            <div>
                <h2>장바구니 목록</h2>
                <div className="card">
                    {cartItems.length === 0 ? (
                        <p className="empty-message">장바구니가 비어있습니다.</p>
                    ) : (
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <div className="cart-item" key={item.postId}>
                                    {
                                        !item.urlFilePath ? <img src='images/userImage.jpg' className="item-image" onClick={()=>{navigate("/postDetail/"+item.postId)}} style={{cursor:'pointer'}} /> : <img src={item.urlFilePath} alt="이미지들" className="item-image" onClick={()=>{navigate("/postDetail/"+item.postId)}} style={{cursor:'pointer'}} />
                                    }
                                    <div className="item-details" onClick={()=>{navigate("/postDetail/"+item.postId)}} style={{cursor:'pointer'}}>
                                        <div className="item-title">{item.postTitle}</div>
                                        <div className="item-price">{Number(item.postPrice).toLocaleString()}원</div>
                                        {/* <div className="item-quantity">
                                            <button 
                                                className="quantity-btn"
                                                onClick={() => updateQuantity(item.postId, item.count - 1)}
                                            >-</button>
                                            <input 
                                                type="text" 
                                                className="quantity-input" 
                                                value={item.count}
                                                readOnly
                                            />
                                            <button 
                                                className="quantity-btn"
                                                onClick={() => updateQuantity(item.postId, item.count + 1)}
                                            >+</button>
                                        </div> */}
                                    </div>
                                    <div className="item-actions">
                                        <button 
                                            className="action-btn remove"
                                            onClick={() => removeItem(item.postId)}
                                        >삭제</button>
                                    </div>
                                </div>
                            ))}
                            
                            <div className="cart-summary">
                                <span className="summary-text">총 결제금액:</span>
                                <span className="total-price">{calculateTotal().toLocaleString()}원</span>
                            </div>
                            
                            <button className="checkout-btn" onClick={clearCart}>
                                장바구니 비우기
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {/* <div>
                <h2>거래내역</h2>
                <div className="card">
                    {transactions.length === 0 ? (
                        <p className="empty-message">거래내역이 없습니다.</p>
                    ) : (
                        <div className="transaction-history">
                            {transactions.map(transaction => (
                                <div className="transaction-item" key={transaction.id}>
                                    <div>
                                        <div>{transaction.description}</div>
                                        <div className="transaction-date">
                                            {new Date(transaction.date).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className={`transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}`}>
                                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()}원
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div> */}
        </div>
        </div>
    );
}

export default Cart;
