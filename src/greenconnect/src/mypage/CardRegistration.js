import React, { useState, useEffect } from "react";
import axios from "axios";

function CardRegistration() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    
    const [formData, setFormData] = useState({
        cardType: 'credit_card',
        cardProvider: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        isDefault: false
    });
    
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/cards', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // 임시 토큰 추가
            });
            setCards(response.data || []); // 데이터가 없으면 빈 배열로 설정
        } catch (err) {
            console.error("카드 정보를 불러오는데 실패했습니다:", err);
            setCards([]); // 실패 시 빈 배열로 설정
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!formData.cardProvider.trim()) {
            formErrors.cardProvider = '카드사를 선택해주세요';
            isValid = false;
        }

        if (!formData.cardNumber.trim()) {
            formErrors.cardNumber = '카드 번호를 입력해주세요';
            isValid = false;
        } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
            formErrors.cardNumber = '유효한 카드 번호를 입력해주세요';
            isValid = false;
        }

        if (!formData.expiryDate.trim()) {
            formErrors.expiryDate = '만료일을 입력해주세요';
            isValid = false;
        } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate)) {
            formErrors.expiryDate = 'MM/YY 형식으로 입력해주세요';
            isValid = false;
        }

        if (!formData.cvv.trim()) {
            formErrors.cvv = 'CVV를 입력해주세요';
            isValid = false;
        } else if (!/^\d{3,4}$/.test(formData.cvv)) {
            formErrors.cvv = '유효한 CVV를 입력해주세요';
            isValid = false;
        }

        setError(formErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const maskedCardNumber = '*'.repeat(12) + formData.cardNumber.slice(-4);
                
                const cardData = {
                    type: formData.cardType,
                    provider: formData.cardProvider,
                    card_number: formData.cardNumber,
                    last_four: formData.cardNumber.slice(-4),
                    expires: formData.expiryDate,
                    cvv: formData.cvv,
                    is_default: formData.isDefault
                };

                if (formData.isDefault) {
                    await axios.post('/api/cards/register', { ...cardData, set_as_default: true }, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    });
                } else {
                    await axios.post('/api/cards/register', cardData, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    });
                }

                await fetchCards();

                setFormData({
                    cardType: 'credit_card',
                    cardProvider: '',
                    cardNumber: '',
                    expiryDate: '',
                    cvv: '',
                    isDefault: false
                });
                
                setIsFormVisible(false);
                alert('카드가 성공적으로 등록되었습니다.');
                
            } catch (err) {
                console.error("카드 등록 실패:", err);
                alert("카드 등록에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    const setDefaultCard = async (cardId) => {
        try {
            await axios.put(`/api/cards/${cardId}/set-default`, null, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            await fetchCards();
        } catch (err) {
            console.error("기본 카드 설정 실패:", err);
            alert("기본 카드 설정에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const deleteCard = async (cardId) => {
        if (window.confirm('이 카드를 정말 삭제하시겠습니까?')) {
            try {
                await axios.delete(`/api/cards/${cardId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                await fetchCards();
            } catch (err) {
                console.error("카드 삭제 실패:", err);
                alert("카드 삭제에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    return (
        <div className="card-registration">
            <div className="section-header">
                <h2>등록된 카드</h2>
                <button
                    className="add-button"
                    onClick={() => setIsFormVisible(!isFormVisible)}
                >
                    {isFormVisible ? '취소' : '카드추가'}
                </button>
            </div>

            {loading ? (
                <div className="loading">카드 정보를 불러오는 중...</div>
            ) : (
                <div className="cards-list">
                    {cards.length === 0 ? (
                        <div className="empty-state">등록된 카드가 없습니다.</div>
                    ) : (
                        cards.map(card => (
                            <div key={card.id} className={`card-item ${card.is_default ? 'default' : ''}`}>
                                <div className="card-info">
                                    <div className="card-provider">{card.provider}</div>
                                    <div className="card-number">**** **** **** {card.last_four}</div>
                                    <div className="card-expires">만료일: {card.expires}</div>
                                    {card.is_default && <div className="default-badge">기본</div>}
                                </div>
                                <div className="card-actions">
                                    {!card.is_default && (
                                        <button
                                            className="set-default-button"
                                            onClick={() => setDefaultCard(card.id)}>
                                            기본으로 설정
                                        </button>
                                    )}
                                    <button
                                        className="delete-button"
                                        onClick={() => deleteCard(card.id)}>
                                        삭제
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {isFormVisible && (
                <form onSubmit={handleSubmit} className="card-form">
                    <div className="form-group">
                        <label>카드종류</label>
                        <select
                            name="cardType"
                            value={formData.cardType}
                            onChange={handleChange}
                        >
                            <option value="credit_card">신용카드</option>
                            <option value="debit_card">체크카드</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>카드사 *</label>
                        <select
                            name="cardProvider"
                            value={formData.cardProvider}
                            onChange={handleChange}
                            className={error.cardProvider ? 'error' : ''}
                        >
                            <option value="">카드사 선택</option>
                            <option value="신한카드">신한카드</option>
                            <option value="국민카드">국민카드</option>
                            <option value="우리카드">우리카드</option>
                            <option value="현대카드">현대카드</option>
                            <option value="삼성카드">삼성카드</option>
                            <option value="롯데카드">롯데카드</option>
                            <option value="하나카드">하나카드</option>
                            <option value="BC카드">BC카드</option>
                            <option value="농협카드">농협카드</option>
                            <option value="카카오카드">카카오카드</option>
                        </select>
                        {error.cardProvider && <span className="error-text">{error.cardProvider}</span>}
                    </div>

                    <div className="form-group">
                        <label>카드번호</label>
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="1234 5678 9101 2345"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className={error.cardNumber ? 'error' : ''}
                            maxLength="19"
                        />
                        {error.cardNumber && <span className="error-text">{error.cardNumber}</span>}
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label>만료일</label>
                            <input
                                type="text"
                                name="expiryDate"
                                placeholder="MM/YY"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                className={error.expiryDate ? 'error' : ''}
                                maxLength="5"
                            />
                            {error.expiryDate && <span className="error-text">{error.expiryDate}</span>}
                        </div>
                        <div className="form-group half">
                            <label>CVV *</label>
                            <input
                                type="password"
                                name="cvv"
                                placeholder="123"
                                value={formData.cvv}
                                onChange={handleChange}
                                className={error.cvv ? 'error' : ''}
                                maxLength="4"
                            />
                            {error.cvv && <span className="error-text">{error.cvv}</span>}
                        </div>
                    </div>

                    <div className="form-group checkbox">
                        <input
                            type="checkbox"
                            id="isDefault"
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={handleChange}
                        />
                        <label htmlFor="isDefault">기본 결제 수단으로 설정</label>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-button">카드등록</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default CardRegistration;