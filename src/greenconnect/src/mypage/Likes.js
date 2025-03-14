import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JjimItem from "./JjimItem";
function Likes() {
    const [jjimList, setJjimList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const userId = localStorage.getItem('userId') || 'user001';

    useEffect(() => {
        fetchJjimList();
    }, []);
    
    const fetchJjimList = async (retryCount = 0) => {
        try {
            const response = await axios.get(`/mypage/Jjim/list?userId=${userId}`);
            
            if (response.data.success) {
                setJjimList(response.data.data || []);
            } else {
                setError(response.data.message || '찜 목록을 불러오는데 실패했습니다.');
            }
        } catch (err) {
            console.error('오류 상세정보:', err.response || err);
            
            // 최대 3번 재시도
            if (retryCount < 3) {
                console.log(`재시도 중... (${retryCount + 1}/3)`);
                setTimeout(() => fetchJjimList(retryCount + 1), 1000);
                return;
            }
            
            setError('서버 연결 오류가 발생했습니다.');
        } finally {
            if (retryCount === 0 || retryCount >= 3) {
                setLoading(false);
            }
        }
    };
        
    const handleRemoveJjim = async (postId) => {
        try {
            // userId를 파라미터로 전달
            const response = await axios.post(`/mypage/Jjim/remove/${postId}?userId=${userId}`);
        
            if (response.data.success) {
                // 찜 목록에서 제거된 아이템 필터링
                setJjimList(jjimList.filter(item => item.postId !== postId));
            } else {
                alert(response.data.message || '찜 삭제에 실패했습니다.');
            }
        } catch (err) {
            alert('서버 연결 오류가 발생했습니다.');
            console.error(err);
        }
    };
        
    if (loading) return <div className="loading">로딩 중...</div>;
    if (error) return <div className="error-message">{error}</div>;
        
    return (
        <div className="jjim-list-container">
            <h1>찜 목록</h1>
            
            {jjimList.length === 0 ? (
                <div className="empty-list">
                    <p>찜한 상품이 없습니다.</p>
                    <button onClick={() => navigate('/products')}>
                        상품 둘러보기
                    </button>
                </div>
            ) : (
                <div className="jjim-grid">
                    {jjimList.map(item => (
                        <JjimItem 
                            key={item.postId} 
                            item={item} 
                            onRemove={handleRemoveJjim} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
    
export default Likes;