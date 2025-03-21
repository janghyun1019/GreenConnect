function JjimItem({ item, onRemove, isBought }) {
    return (
        <div className="jjim-item">
            <img src={item.imageUrl || "/default-image.jpg"} alt={item.title} className="jjim-image" />
            <div className="jjim-details">
                <h3>{item.title}</h3>
                <p>가격: {item.price.toLocaleString()}원</p>
                <p>구매 상태: {isBought ? "구매 완료" : "구매 미완료"}</p>
                <button
                    className="remove-btn"
                    onClick={() => onRemove(item.postId)}
                >
                    찜 삭제
                </button>
            </div>
        </div>
    );
}

export default JjimItem;