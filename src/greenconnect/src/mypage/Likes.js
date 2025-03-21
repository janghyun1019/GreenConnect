import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JjimItem from "./JjimItem";
import Sidebar from "./components/Sidebar";

function Likes() {
    const [jjimList, setJjimList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId") || "user001";
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        fetchJjimList();
    }, []);

    const fetchJjimList = async () => {
        setLoading(true);
        setError(null);

        if (!userId || !token) {
            setError("로그인이 필요합니다.");
            setLoading(false);
            return;
        }

        try {
            // 찜 목록 조회
            const jjimResponse = await axios.get(
                `/mypage/Jjim/list?userId=${userId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("Jjim list response:", jjimResponse.data);

            if (jjimResponse.data.success) {
                const jjimItems = jjimResponse.data.data || [];

                // 각 찜 항목에 구매 여부 확인
                const enrichedJjimList = await Promise.all(
                    jjimItems.map(async (item) => {
                        const buyResponse = await axios.post(
                            "/api/getBuyInfo",
                            { userId, postId: item.postId },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        const isBought = buyResponse.data && buyResponse.data.payState === "Y";
                        return { ...item, isBought };
                    })
                );

                setJjimList(enrichedJjimList);
            } else {
                setError(jjimResponse.data.message || "찜 목록을 불러오는데 실패했습니다.");
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 401) {
                    setError("인증 실패: 다시 로그인해주세요.");
                } else if (err.response.status === 404) {
                    setError("찜 목록이 없습니다.");
                } else if (err.response.status === 500) {
                    setError("서버 내부 오류가 발생했습니다. 관리자에게 문의하세요.");
                } else {
                    setError(`찜 목록 조회 실패: ${err.response.status} - ${err.response.data}`);
                }
            } else {
                setError("서버 연결 오류: 백엔드가 실행 중인지 확인하세요.");
            }
            console.error("Error fetching jjim list:", err.response || err);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveJjim = async (postId) => {
        try {
            const response = await axios.post(
                `/mypage/Jjim/remove/${postId}?userId=${userId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                setJjimList(jjimList.filter((item) => item.postId !== postId));
                alert("찜이 삭제되었습니다.");
            } else {
                alert(response.data.message || "찜 삭제에 실패했습니다.");
            }
        } catch (err) {
            alert("찜 삭제 중 오류가 발생했습니다.");
            console.error("Error removing jjim:", err);
        }
    };

    if (loading) return <div className="loading">로딩 중...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="jjim-list-container">
            <Sidebar />
            <div className="main_content">
                <h1>찜 목록</h1>
                {jjimList.length === 0 ? (
                    <div className="empty-list">
                        <p>찜한 상품이 없습니다.</p>
                        <button onClick={() => navigate("/postList")}>
                            상품 둘러보기
                        </button>
                    </div>
                ) : (
                    <div className="jjim-grid">
                        {jjimList.map((item) => (
                            <JjimItem
                                key={item.postId}
                                item={item}
                                onRemove={handleRemoveJjim}
                                isBought={item.isBought} // 구매 여부 전달
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Likes;