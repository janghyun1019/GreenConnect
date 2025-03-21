import React, { useState, useEffect } from "react";
import axios from "axios";


function CardRegistration() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    const [formData, setFormData] = useState({
        cardType: "credit_card",
        cardProvider: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        isDefault: false,
    });
    const [isFormVisible, setIsFormVisible] = useState(false);

    // 페이지 로드 시 즉시 카드 조회
    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("accessToken"); // 'token' 대신 'accessToken' 사용
    
        setLoading(true);
        console.log("userId:", userId, "token:", token); // 값 확인
        if (!userId || !token) {
            console.log("userId 또는 token이 없습니다. 빈 목록 표시.");
            setCards([]);
            setLoading(false);
            return;
        }
    
        try {
            console.log("Fetching cards for userId:", userId);
            const response = await axios.get(`/api/cards?userId=${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Response status:", response.status);
            console.log("Response data:", response.data);
            setCards(response.data || []);
        } catch (err) {
            console.error("카드 정보를 불러오는데 실패했습니다:", err);
            if (err.response) {
                console.log("Error status:", err.response.status);
                console.log("Error data:", err.response.data);
            }
            setCards([]);
            setError({ general: "카드 정보를 불러오는데 실패했습니다." });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!formData.cardProvider.trim()) {
            formErrors.cardProvider = "카드사를 선택해주세요";
            isValid = false;
        }

        if (!formData.cardNumber.trim()) {
            formErrors.cardNumber = "카드 번호를 입력해주세요";
            isValid = false;
        } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
            formErrors.cardNumber = "유효한 16자리 카드 번호를 입력해주세요";
            isValid = false;
        }

        if (!formData.expiryDate.trim()) {
            formErrors.expiryDate = "만료일을 입력해주세요";
            isValid = false;
        } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate)) {
            formErrors.expiryDate = "MM/YY 형식으로 입력해주세요";
            isValid = false;
        }

        if (!formData.cvv.trim()) {
            formErrors.cvv = "CVV를 입력해주세요";
            isValid = false;
        } else if (!/^\d{3,4}$/.test(formData.cvv)) {
            formErrors.cvv = "유효한 CVV를 입력해주세요";
            isValid = false;
        }

        setError(formErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId"); // 최신 값 가져오기
        const token = localStorage.getItem("accessToken");

        // if (!userId || !token) {
        //     alert("로그인이 필요합니다.");
        //     return;
        // }

        if (validateForm()) {
            try {
                const cardData = {
                    userId: userId,
                    cardType: formData.cardType,
                    cardProvider: formData.cardProvider,
                    lastFour: formData.cardNumber.slice(-4),
                    expires: formData.expiryDate,
                    isDefault: formData.isDefault,
                };
                console.log("Sending card data:", cardData);

                await axios.post("/api/cards/register", cardData, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                await fetchCards();

                setFormData({
                    cardType: "credit_card",
                    cardProvider: "",
                    cardNumber: "",
                    expiryDate: "",
                    cvv: "",
                    isDefault: false,
                });
                setIsFormVisible(false);
                alert("카드가 성공적으로 등록되었습니다.");
            } catch (err) {
                console.error("카드 등록 실패:", err);
                alert("카드 등록에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    const setDefaultCard = async (cardId) => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("accessToken");

        if (!userId || !token) {
            alert("로그인이 필요합니다.");
            return;
        }

        try {
            await axios.put(`/api/cards/${cardId}/set-default?userId=${userId}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchCards();
            alert("기본 카드가 설정되었습니다.");
        } catch (err) {
            console.error("기본 카드 설정 실패:", err);
            alert("기본 카드 설정에 실패했습니다.");
        }
    };

    const deleteCard = async (cardId) => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("accessToken");

        if (!userId || !token) {
            alert("로그인이 필요합니다.");
            return;
        }

        if (window.confirm("이 카드를 정말 삭제하시겠습니까?")) {
            try {
                await axios.delete(`/api/cards/${cardId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                await fetchCards();
                alert("카드가 삭제되었습니다.");
            } catch (err) {
                console.error("카드 삭제 실패:", err);
                alert("카드 삭제에 실패했습니다.");
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
                    {isFormVisible ? "취소" : "카드 추가"}
                </button>
            </div>

            {loading ? (
                <div className="loading">카드 정보를 불러오는 중...</div>
            ) : error.general ? (
                <div className="error">{error.general}</div>
            ) : (
                <div className="cards-list">
                    {cards.length === 0 ? (
                        <div className="empty-state">등록된 카드가 없습니다.</div>
                    ) : (
                        cards.map((card) => (
                            <div
                                key={card.cardId}
                                className={`card-item ${card.isDefault ? "default" : ""}`}
                            >
                                <div className="card-info">
                                    <div className="card-provider">{card.cardProvider}</div>
                                    <div className="card-number">
                                        **** **** **** {card.lastFour}
                                    </div>
                                    <div className="card-expires">만료일: {card.expires}</div>
                                    {card.isDefault && (
                                        <div className="default-badge">기본</div>
                                    )}
                                </div>
                                <div className="card-actions">
                                    {!card.isDefault && (
                                        <button
                                            className="set-default-button"
                                            onClick={() => setDefaultCard(card.cardId)}
                                        >
                                            기본으로 설정
                                        </button>
                                    )}
                                    <button
                                        className="delete-button"
                                        onClick={() => deleteCard(card.cardId)}
                                    >
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
                        <label>카드 종류</label>
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
                            className={error.cardProvider ? "error" : ""}
                        >
                            <option value="">카드사 선택</option>
                            <option value="신한카드">신한카드</option>
                            <option value="국민카드">국민카드</option>
                            <option value="우리카드">우리카드</option>
                            <option value="현대카드">현대카드</option>
                        </select>
                        {error.cardProvider && (
                            <span className="error-text">{error.cardProvider}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>카드 번호 *</label>
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className={error.cardNumber ? "error" : ""}
                            maxLength="19"
                        />
                        {error.cardNumber && (
                            <span className="error-text">{error.cardNumber}</span>
                        )}
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label>만료일 *</label>
                            <input
                                type="text"
                                name="expiryDate"
                                placeholder="MM/YY"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                className={error.expiryDate ? "error" : ""}
                                maxLength="5"
                            />
                            {error.expiryDate && (
                                <span className="error-text">{error.expiryDate}</span>
                            )}
                        </div>
                        <div className="form-group half">
                            <label>CVV *</label>
                            <input
                                type="password"
                                name="cvv"
                                placeholder="123"
                                value={formData.cvv}
                                onChange={handleChange}
                                className={error.cvv ? "error" : ""}
                                maxLength="4"
                            />
                            {error.cvv && (
                                <span className="error-text">{error.cvv}</span>
                            )}
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
                        <button type="submit" className="submit-button">
                            카드 등록
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default CardRegistration;