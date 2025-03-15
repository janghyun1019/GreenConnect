import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../../components/button";
import Input from "../../../components/input";
import Textarea from "../../../components/textarea";
import axios from "axios";
import "./noticeBoard.css";

export default function NoticeForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            fetchNotice();
        }
    }, [id]);

    const fetchNotice = async () => {
        try {
            const response = await axios.get(`/api/notices/${id}`);
            setTitle(response.data.title);
            setContent(response.data.content);
        } catch (error) {
            console.error("Error fetching notice", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const noticeData = { title, content, userId: localStorage.getItem("userId") };

        try {
            if (isEdit) {
                await axios.put(`/api/notices/${id}`, noticeData);
                alert("공지사항이 수정되었습니다.");
            } else {
                await axios.post("/api/notices", noticeData);
                alert("공지사항이 등록되었습니다.");
            }
            navigate("/notice");
        } catch (error) {
            console.error("Error saving notice", error);
        }
    };

    return (
        <div className="notice-container">
            <h1 className="notice-title">{isEdit ? "공지사항 수정" : "공지사항 작성"}</h1>
            <form onSubmit={handleSubmit} className="notice-form">
                <Input
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <Textarea
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <div className="notice-actions">
                    <Button type="submit" className="notice-submit">{isEdit ? "수정하기" : "등록하기"}</Button>
                    <Button onClick={() => navigate("/notice")} className="notice-cancel">취소</Button>
                </div>
            </form>
        </div>
    );
}
