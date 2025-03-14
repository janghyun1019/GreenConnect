import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../../components/button";
import axios from "axios";
import "./noticeBoard.css";

export default function NoticeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notice, setNotice] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부

    useEffect(() => {
        fetchNotice();
        checkAdmin();
    }, []);

    const fetchNotice = async () => {
        try {
            const response = await axios.get(`/api/notices/${id}`);
            setNotice(response.data);
        } catch (error) {
            console.error("Error fetching notice", error);
        }
    };

    const checkAdmin = () => {
        // 로컬 스토리지 또는 상태에서 사용자 정보 확인 (예: userType === 'admin')
        const userType = localStorage.getItem("userType");
        setIsAdmin(userType === "admin");
    };

    const deleteNotice = async () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                await axios.delete(`/api/notices/${id}`);
                alert("공지사항이 삭제되었습니다.");
                navigate("/notice");
            } catch (error) {
                console.error("Error deleting notice", error);
            }
        }
    };

    if (!notice) return <p>로딩 중...</p>;

    return (
        <div className="notice-container">
            <h1 className="notice-title">{notice.title}</h1>
            <p className="notice-meta">작성자: {notice.userId} | {new Date(notice.createdAt).toLocaleDateString()}</p>
            <div className="notice-content">{notice.content}</div>
            <div className="notice-actions">
                <Button onClick={() => navigate("/notice")} className="notice-back">목록으로</Button>
                {isAdmin && (
                    <>
                        <Button onClick={() => navigate(`/notice/edit/${id}`)} className="notice-edit">수정</Button>
                        <Button onClick={deleteNotice} className="notice-delete">삭제</Button>
                    </>
                )}
            </div>
        </div>
    );
}