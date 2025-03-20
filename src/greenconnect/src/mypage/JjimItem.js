import React from 'react';
import { useNavigate } from 'react-router-dom';


const JjimItem = ({ item, onRemove }) => {
    const navigate = useNavigate();
    
    const handleItemClick = () => {
        navigate(`/postDetail/${item.postId}`);
    };
    
    const handleRemoveClick = (e) => {
        e.stopPropagation(); // 상위 요소의 클릭 이벤트가 발생하지 않도록 방지
        onRemove(item.postId);
    };
    
    // 가격을 천 단위로 콤마 포맷팅
    const formattedPrice = item.price.toLocaleString();
    
    return (
        <div className="jjim-item" onClick={handleItemClick}>
        <div className="jjim-image-container">
            <img 
            src={item.imageUrl || '/placeholder-image.jpg'} 
            alt={item.title} 
            className="jjim-image" 
            />
            <button 
            className="remove-jjim-btn" 
            onClick={handleRemoveClick}
            title="찜 해제"
            >
            </button>
        </div>
        <div className="jjim-info">
            <h3 className="jjim-title">{item.title}</h3>
            <p className="jjim-price">{formattedPrice}원</p>
        </div>
        </div>
    );
};

export default JjimItem;