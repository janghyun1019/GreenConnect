import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Cart.css';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetchCartItems();
        fetchTransactions();
    }, []);
    
    const fetchCartItems = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:8080/cart/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setCartItems(response.data);
            setLoading(false);
        } catch (error) {
            console.error('장바구니 불러오기 실패:', error);
            setError('장바구니를 불러오는 중 오류가 발생했습니다.');
            setLoading(false);
        }
    };
    
    const fetchTransactions = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:8080/transactions/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTransactions(response.data);
        } catch (error) {
            console.error('거래내역 불러오기 실패:', error);
        }
    };
    
    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        
        try {
            const userId = localStorage.getItem('userId');
            await axios.put(`http://localhost:8080/cart/update`, {
                userId,
                itemId,
                quantity: newQuantity
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            setCartItems(cartItems.map(item => 
                item.id === itemId ? {...item, quantity: newQuantity} : item
            ));
        } catch (error) {
            console.error('수량 업데이트 실패:', error);
        }
    };
    
    const removeItem = async (itemId) => {
        try {
            const userId = localStorage.getItem('userId');
            await axios.delete(`http://localhost:8080/cart/remove/${userId}/${itemId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            setCartItems(cartItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('아이템 삭제 실패:', error);
        }
    };
    
    const checkout = async () => {
        if (cartItems.length === 0) {
            alert('장바구니가 비어있습니다.');
            return;
        }
        
        try {
            const userId = localStorage.getItem('userId');
            await axios.post(`http://localhost:8080/checkout/${userId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            alert('결제가 완료되었습니다.');
            setCartItems([]);
            fetchTransactions();
        } catch (error) {
            console.error('결제 실패:', error);
            alert('결제 중 오류가 발생했습니다.');
        }
    };
    
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };
    
    if (loading) {
        return <div className="Cart-container"><p>로딩 중...</p></div>;
    }
    
    if (error) {
        return <div className="Cart-container"><p>{error}</p></div>;
    }

    return (
        <div className="Cart-container">
            <h1>장바구니</h1>
            <div>
                <h2>장바구니 목록</h2>
                <div className="card">
                    {cartItems.length === 0 ? (
                        <p className="empty-message">장바구니가 비어있습니다.</p>
                    ) : (
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <div className="cart-item" key={item.id}>
                                    <img 
                                        src={item.imageUrl || '/placeholder-image.jpg'} 
                                        alt={item.name} 
                                        className="item-image" 
                                    />
                                    <div className="item-details">
                                        <div className="item-name">{item.name}</div>
                                        <div className="item-price">{item.price.toLocaleString()}원</div>
                                        <div className="item-quantity">
                                            <button 
                                                className="quantity-btn"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >-</button>
                                            <input 
                                                type="text" 
                                                className="quantity-input" 
                                                value={item.quantity}
                                                readOnly
                                            />
                                            <button 
                                                className="quantity-btn"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >+</button>
                                        </div>
                                    </div>
                                    <div className="item-actions">
                                        <button 
                                            className="action-btn remove"
                                            onClick={() => removeItem(item.id)}
                                        >삭제</button>
                                    </div>
                                </div>
                            ))}
                            
                            <div className="cart-summary">
                                <span className="summary-text">총 결제금액:</span>
                                <span className="total-price">{calculateTotal().toLocaleString()}원</span>
                            </div>
                            
                            <button className="checkout-btn" onClick={checkout}>
                                결제하기
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div>
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
            </div>
        </div>
    );
}

export default Cart;