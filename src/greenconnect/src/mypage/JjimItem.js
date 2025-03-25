import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/MyPage.css';


const JjimItem = ({ item, onRemove }) => {
    const navigate = useNavigate();
    // const [jjimList, setJjimList] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    
    const handleItemClick = () => {
        navigate(`/postDetail/${item.postId}`);
    };
    
    const handleRemoveClick = (e) => {
        e.stopPropagation(); // 상위 요소의 클릭 이벤트가 발생하지 않도록 방지
        onRemove(item.postId);
    };

    // useEffect(() => {
    //     const fetchJjimList = async () => {
    //         setLoading(true);
    //         try {
    //             const jjimData = {
    //                 userId: localStorage.getItem('userId'),
    //                 postId: item.postId
    //             };
                
    //             const response = await axios.post("/api/postListByUserIdAndPostId", jjimData, {
    //                 headers: { "Content-Type": "application/json" }
    //             });

    //             if (response.data) {
    //                 console.log("찜한 리스트들:", response.data);
    //                 setJjimList(response.data);
    //             } else {
    //                 alert("데이터가 없습니다.");
    //             }
    //         } catch (err) {
    //             console.error("오류 상세정보:", err.response || err);
    //             setError("서버 연결 오류가 발생했습니다.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (item?.postId) {
    //         fetchJjimList();
    //     }
    // }, [item?.postId]);
    
    // 가격을 천 단위로 콤마 포맷팅
    // const formattedPrice = item.price.toLocaleString();

    // if (loading) return <div className="loading">로딩 중...</div>;
    // if (error) return <div className="error-message">{error}</div>;
    
    return (
        <div className="jjim-item" onClick={handleItemClick} style={{width:'300px', height:'300px'}}>
        <div className="jjim-image-container" style={{padding: '15px'}}>
            <img 
            src={item.urlFilePath} 
            alt={item.postTitle} 
            className="jjim-image"
            style={{width:'200px'}}
            />
            <button 
            className="remove-jjim-btn" 
            onClick={handleRemoveClick}
            title="찜 해제"
            >
            </button>
        </div>
        <div className="jjim-info">
            <h3 className="jjim-title">{item.postTitle}</h3>
            {/* <p className="jjim-price">{formattedPrice}원</p> */}
        </div>
        </div>
    );
};

export default JjimItem;