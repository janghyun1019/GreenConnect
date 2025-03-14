import React, { useState,useEffect } from "react";
import axios from "axios";

function AddressRegistration() {
    const [address, setAddress] = useState(null);

    const [formData, setFormData] = useState({
        receiver: '',
        phone: '',
        postal_code: '',
        address1: '',
        address2: '',
        is_default: false
    });

    const [error, setError] = useState({});
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        setIsLoading(true);
        try {
            // Spring Boot 서버 API 엔드포인트 호출
            const response = await axios.get('/api/addresses');
            setAddress(response.data);
        } catch (error) {
            console.error("주소 목록을 불러오는데 실패했습니다:", error);
            alert("주소 목록을 불러오는데 실패했습니다.");
        } finally {
            setIsLoading(false);
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

        if (!formData.receiver.trim()) {
            formErrors.receiver = '수령인 이름을 입력해주세요.';
            isValid = false;
        }

        if (!formData.phone.trim()) {
            formErrors.phone = '연락처를 입력해주세요';
            isValid = false;
        } else if (!/^\d{3}-\d{3,4}-\d{4}$/.test(formData.phone)) {
            formErrors.phone = '올바른 연락처 형식으로 입력해주세요.(ex:010-1234-5678)';
            isValid = false;
        }

        if (!formData.postal_code.trim()) {
            formErrors.postal_code = '우편번호를 입력해주세요';
            isValid = false;
        }

        if (!formData.address1.trim()) {
            formErrors.address1 = "기본주소를 입력해주십세요.";
            isValid = false;
        }

        setError(formErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsLoading(true);
            try {
                // 서버로 전송할 주소 데이터 객체
                const addressData = {
                    receiver: formData.receiver,
                    phone: formData.phone,
                    postal_code: formData.postal_code,
                    address1: formData.address1,
                    address2: formData.address2,
                    is_default: formData.is_default
                };

                // 서버 API에 POST 요청으로 데이터 전송
                await axios.post('/api/addresses', addressData);
                
                // 주소 목록 새로고침
                await fetchAddresses();
                
                // 폼 초기화
                setFormData({
                    receiver: '',
                    phone: '',
                    postal_code: '',
                    address1: '',
                    address2: '',
                    is_default: false
                });
                
                setIsFormVisible(false);
                alert('주소가 성공적으로 등록되었습니다.');
            } catch (error) {
                console.error("주소 등록 실패:", error);
                alert("주소 등록에 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        }
    };
    const setDefaultAddress = async (addressId) => {
        setIsLoading(true);
        try {
            // PUT 요청으로 기본 주소 설정
            await axios.put(`/api/addresses/${addressId}/default`);
            // 변경된 주소 목록 다시 불러오기
            await fetchAddresses();
        } catch (error) {
            console.error("기본 주소 설정 실패:", error);
            alert("기본 주소 설정에 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    // 주소 삭제 함수 - 서버 API 호출
    const deleteAddress = async (addressId) => {
        if (window.confirm('이 주소를 정말 삭제하시겠습니까?')) {
            setIsLoading(true);
            try {
                // DELETE 요청으로 주소 삭제
                await axios.delete(`/api/addresses/${addressId}`);
                // 주소 목록 다시 불러오기
                await fetchAddresses();
            } catch (error) {
                console.error("주소 삭제 실패:", error);
                alert("주소 삭제에 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const searchPostalCode = () => {
        if (!window.daum || !window.daum.Postcode) {
            const script = document.createElement('script');
            script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
            script.onload = () => openPostcode();
            document.head.appendChild(script);
        } else {
            openPostcode();
        }
    };

    const openPostcode = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                setFormData({
                    ...formData,
                    postal_code: data.zonecode,
                    address1: data.roadAddress || data.jibunAddress
                });
            }
        }).open();
    };

    return (
        <div className="address-registration">
            <div className="section-header">
                <h2>등록된 주소</h2>
                <button
                    className="add-button"
                    onClick={() => setIsFormVisible(!isFormVisible)}>
                    {isFormVisible ? '취소' : '주소추가'}
                </button>
            </div>

            {isFormVisible && (
                <form onSubmit={handleSubmit} className="address-form">
                    <div className="form-group">
                        <label>수령인 *</label>
                        <input
                            type="text"
                            name="receiver"
                            placeholder="홍길동"
                            value={formData.receiver}
                            onChange={handleChange}
                            className={error.receiver ? 'error' : ''}
                        />
                        {error.receiver && <span className="error-text">{error.receiver}</span>}
                    </div>

                    <div className="form-group">
                        <label>연락처 *</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="010-1234-5678"
                            value={formData.phone}
                            onChange={handleChange}
                            className={error.phone ? 'error' : ''}
                        />
                        {error.phone && <span className="error-text">{error.phone}</span>}
                    </div>

                    <div className="form-group">
                        <label>우편번호 *</label>
                        <div className="postal-code-container">
                            <input
                                type="text"
                                name="postal_code"
                                placeholder="06164"
                                value={formData.postal_code}
                                onChange={handleChange}
                                className={error.postal_code ? 'error' : ''}
                                readOnly
                            />
                            <button
                                type="button"
                                className="search-button"
                                onClick={searchPostalCode}
                            >
                                우편번호 검색
                            </button>
                        </div>
                        {error.postal_code && <span className="error-text">{error.postal_code}</span>}
                    </div>

                    <div className="form-group">
                        <label>기본 주소 *</label>
                        <input
                            type="text"
                            name="address1"
                            placeholder="충남 천안시 동남구 대흥로 215"
                            value={formData.address1}
                            onChange={handleChange}
                            className={error.address1 ? 'error' : ''}
                            readOnly
                        />
                        {error.address1 && <span className="error-text">{error.address1}</span>}
                    </div>

                    <div className="form-group">
                        <label>상세 주소</label>
                        <input
                            type="text"
                            name="address2"
                            placeholder="백자빌딩 7층 휴먼교육센터"
                            value={formData.address2}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group checkbox">
                        <input
                            type="checkbox"
                            id="isDefault"
                            name="is_default"
                            checked={formData.is_default}
                            onChange={handleChange}
                        />
                        <label htmlFor="isDefault">기본 배송지로 설정</label>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-button">주소 등록</button>
                    </div>
                </form>
            )}

            <div className="addresses-list">
                {address.length === 0 ? (
                    <div className="empty-state">등록된 주소가 없습니다.</div>
                ) : (
                    address.map(addr => (
                        <div key={addr.id} className={`address-item ${addr.is_default ? 'default' : ''}`}>
                            <div className="address-info">
                                <div className="address-receiver">{addr.receiver}</div>
                                <div className="address-phone">{addr.phone}</div>
                                <div className="address-full">
                                    [{addr.postal_code}] {addr.address1} {addr.address2}
                                </div>
                                {addr.is_default && <div className="default-badge">기본 배송지</div>}
                            </div>
                            <div className="address-actions">
                                {!addr.is_default && (
                                    <button
                                        className="set-default-button"
                                        onClick={() => setDefaultAddress(addr.id)}
                                    >
                                        기본으로 설정
                                    </button>
                                )}
                                <button
                                    className="delete-button"
                                    onClick={() => deleteAddress(addr.id)}
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default AddressRegistration;