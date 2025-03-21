import React, { useState, useEffect } from "react";
import axios from "axios";

function AddressRegistration() {
    const [address, setAddress] = useState([]);
    const [formData, setFormData] = useState({
        receiver: "",
        phone: "",
        postalCode: "", // 백엔드 DTO와 일치
        address1: "",
        address2: "",
        isDefault: false, // 백엔드 DTO와 일치
    });
    const [error, setError] = useState({});
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // 초기 로딩 true

    useEffect(() => {
        fetchAddresses(); // 페이지 로드 시 즉시 실행
    }, []);

    const fetchAddresses = async () => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("accessToken"); // accessToken 사용

        setIsLoading(true);
        console.log("userId:", userId, "token:", token);
        if (!userId || !token) {
            console.log("userId 또는 token이 없습니다. 빈 목록 표시.");
            setAddress([]);
            setIsLoading(false);
            return;
        }

        try {
            console.log("Fetching addresses for userId:", userId);
            const response = await axios.get(`/mypage/addresses/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Response status:", response.status);
            console.log("Response data:", response.data);
            setAddress(response.data || []);
        } catch (err) {
            console.error("주소 목록을 불러오는데 실패했습니다:", err);
            if (err.response) {
                console.log("Error status:", err.response.status);
                console.log("Error data:", err.response.data);
            }
            setAddress([]);
            setError({ general: "주소 목록을 불러오는데 실패했습니다." });
        } finally {
            setIsLoading(false);
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

        if (!formData.receiver.trim()) {
            formErrors.receiver = "수령인 이름을 입력해주세요.";
            isValid = false;
        }

        if (!formData.phone.trim()) {
            formErrors.phone = "연락처를 입력해주세요";
            isValid = false;
        } else if (!/^\d{3}-\d{3,4}-\d{4}$/.test(formData.phone)) {
            formErrors.phone = "올바른 연락처 형식으로 입력해주세요.(ex:010-1234-5678)";
            isValid = false;
        }

        if (!formData.postalCode.trim()) {
            formErrors.postalCode = "우편번호를 입력해주세요";
            isValid = false;
        }

        if (!formData.address1.trim()) {
            formErrors.address1 = "기본주소를 입력해주세요.";
            isValid = false;
        }

        setError(formErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("accessToken");

        console.log("handleSubmit - userId:", userId, "token:", token);
        if (!userId || !token) {
            alert("로그인이 필요합니다.");
            return;
        }

        if (validateForm()) {
            setIsLoading(true);
            try {
                const addressData = {
                    userId: userId,
                    postalCode: formData.postalCode,
                    address1: formData.address1,
                    address2: formData.address2,
                    receiver: formData.receiver,
                    phone: formData.phone,
                    isDefault: formData.isDefault,
                };
                console.log("Sending address data:", addressData);

                await axios.post("/mypage/addresses", addressData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                await fetchAddresses();
                setFormData({
                    receiver: "",
                    phone: "",
                    postalCode: "",
                    address1: "",
                    address2: "",
                    isDefault: false,
                });
                setIsFormVisible(false);
                alert("주소가 성공적으로 등록되었습니다.");
            } catch (err) {
                console.error("주소 등록 실패:", err);
                alert("주소 등록에 실패했습니다. 다시 시도해주세요.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const setDefaultAddress = async (addressId) => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("accessToken");

        if (!userId || !token) {
            alert("로그인이 필요합니다.");
            return;
        }

        setIsLoading(true);
        try {
            await axios.put(`/mypage/addresses/${userId}/default/${addressId}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchAddresses();
            alert("기본 주소가 설정되었습니다.");
        } catch (err) {
            console.error("기본 주소 설정 실패:", err);
            alert("기본 주소 설정에 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    const deleteAddress = async (addressId) => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("accessToken");

        if (!userId || !token) {
            alert("로그인이 필요합니다.");
            return;
        }

        if (window.confirm("이 주소를 정말 삭제하시겠습니까?")) {
            setIsLoading(true);
            try {
                await axios.delete(`/mypage/addresses/${addressId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                await fetchAddresses();
                alert("주소가 삭제되었습니다.");
            } catch (err) {
                console.error("주소 삭제 실패:", err);
                alert("주소 삭제에 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const searchPostalCode = () => {
        if (!window.daum || !window.daum.Postcode) {
            const script = document.createElement("script");
            script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
            script.onload = () => openPostcode();
            document.head.appendChild(script);
        } else {
            openPostcode();
        }
    };

    const openPostcode = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                setFormData({
                    ...formData,
                    postalCode: data.zonecode,
                    address1: data.roadAddress || data.jibunAddress,
                });
            },
        }).open();
    };

    return (
        <div className="address-registration">
            <div className="section-header">
                <h2>등록된 주소</h2>
                <button
                    className="add-button"
                    onClick={() => setIsFormVisible(!isFormVisible)}
                >
                    {isFormVisible ? "취소" : "주소추가"}
                </button>
            </div>

            {isLoading ? (
                <div className="loading">주소 목록을 불러오는 중...</div>
            ) : error.general ? (
                <div className="error">{error.general}</div>
            ) : (
                <div className="addresses-list">
                    {address.length === 0 ? (
                        <div className="empty-state">등록된 주소가 없습니다.</div>
                    ) : (
                        address.map((addr) => (
                            <div
                                key={addr.id}
                                className={`address-item ${addr.isDefault ? "default" : ""}`}
                            >
                                <div className="address-info">
                                    <div className="address-receiver">{addr.receiver}</div>
                                    <div className="address-phone">{addr.phone}</div>
                                    <div className="address-full">
                                        [{addr.postalCode}] {addr.address1} {addr.address2}
                                    </div>
                                    {addr.isDefault && (
                                        <div className="default-badge">기본 배송지</div>
                                    )}
                                </div>
                                <div className="address-actions">
                                    {!addr.isDefault && (
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
            )}

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
                            className={error.receiver ? "error" : ""}
                        />
                        {error.receiver && (
                            <span className="error-text">{error.receiver}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>연락처 *</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="010-1234-5678"
                            value={formData.phone}
                            onChange={handleChange}
                            className={error.phone ? "error" : ""}
                        />
                        {error.phone && <span className="error-text">{error.phone}</span>}
                    </div>

                    <div className="form-group">
                        <label>우편번호 *</label>
                        <div className="postal-code-container">
                            <input
                                type="text"
                                name="postalCode"
                                placeholder="06164"
                                value={formData.postalCode}
                                onChange={handleChange}
                                className={error.postalCode ? "error" : ""}
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
                        {error.postalCode && (
                            <span className="error-text">{error.postalCode}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>기본 주소 *</label>
                        <input
                            type="text"
                            name="address1"
                            placeholder="충남 천안시 동남구 대흥로 215"
                            value={formData.address1}
                            onChange={handleChange}
                            className={error.address1 ? "error" : ""}
                            readOnly
                        />
                        {error.address1 && (
                            <span className="error-text">{error.address1}</span>
                        )}
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
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={handleChange}
                        />
                        <label htmlFor="isDefault">기본 배송지로 설정</label>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-button">
                            주소 등록
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default AddressRegistration;