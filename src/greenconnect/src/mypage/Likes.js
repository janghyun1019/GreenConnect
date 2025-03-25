import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JjimItem from "./JjimItem";
import Sidebar from "./components/Sidebar";
import './css/MyPage.css';

function Likes() {
    const [jjimList, setJjimList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const userId = localStorage.getItem('userId') || 'user001';

    useEffect(() => {
        fetchJjimList();
    }, []);
    
    const fetchJjimList = async () => {
        const jjimData = {
            userId: localStorage.getItem('userId')
        }
        try {
            const response = await axios.post("/api/getPostJjimList", jjimData,{
                headers: { "Content-Type": 'application/json' }
            })
            if (response.data) {
                console.log("찜리스트: " + response.data);
                setJjimList(response.data);
                setLoading(false);
            } else {
                alert("데이터가 없습니다.");
                setLoading(false);
            }
        } catch (err) {
            console.error('오류 상세정보:', err.response || err);
            
            // // 최대 3번 재시도
            // if (retryCount < 3) {
            //     console.log(`재시도 중... (${retryCount + 1}/3)`);
            //     setTimeout(() => fetchJjimList(retryCount + 1), 1000);
            //     return;
            // }
            
            setError('서버 연결 오류가 발생했습니다.');
        } 
        // finally {
        //     if (retryCount === 0 || retryCount >= 3) {
        //         setLoading(false);
        //     }
        // }
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

    useEffect(() => {
            const fetchJjimList = async () => {
                setLoading(true);
                try {
                    const jjimData = {
                        userId: localStorage.getItem('userId')
                    };
                    
                    const response = await axios.post("/api/postListByUserIdAndPostId", jjimData, {
                        headers: { "Content-Type": "application/json" }
                    });
    
                    if (response.data) {
                        console.log("찜한 리스트들:", response.data);
                        setJjimList(response.data);
                    } else {
                        alert("데이터가 없습니다.");
                    }
                } catch (err) {
                    console.error("오류 상세정보:", err.response || err);
                    setError("서버 연결 오류가 발생했습니다.");
                } finally {
                    setLoading(false);
                }
            };
    
            if (userId) {
                fetchJjimList();
            }
        }, [userId]);
        
    if (loading) return <div className="loading">로딩 중...</div>;
    if (error) return <div className="error-message">{error}</div>;
    return (
        <div className="mypageSide">
                        <Sidebar />
                        <div className="main_content">
            <h1>찜 목록</h1>
            
            {jjimList.length === 0 ? (
                <div className="empty-list">
                    <p>찜한 상품이 없습니다.</p>
                    <button onClick={() => navigate('/postList')}>
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
        </div>
    );
}
    
export default Likes;