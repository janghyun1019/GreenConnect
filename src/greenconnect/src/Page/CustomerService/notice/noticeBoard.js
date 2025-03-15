import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../../components/table";
import Button from "../../../components/button";
import Input from "../../../components/input";
import axios from "axios";
import "./noticeBoard.css";

export default function NoticeBoard() {
    const [notices, setNotices] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchNotices();
    }, [page, search]);

    const fetchNotices = async () => {
        try {
            const response = await axios.get(`/api/notices?page=${page}&size=10`);
            setNotices(response.data);
            setTotalPages(Math.ceil(response.data.length / 10));
        } catch (error) {
            console.error("Error fetching notices", error);
        }
    };

    return (
        <div className="notice-container">
            <h1 className="notice-title">공지사항</h1>
            <Input 
                placeholder="검색어를 입력하세요..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="notice-search"
            />
            <Table className="notice-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {notices.map((notice, index) => (
                        <tr key={notice.noticeId}>
                            <td>{index + 1}</td>
                            <td>
                                <Link to={`/notice/${notice.noticeId}`} className="notice-link">{notice.title}</Link>
                            </td>
                            <td>{notice.userId}</td>
                            <td>{new Date(notice.createdAt).toLocaleDateString()}</td>
                            <td>{notice.viewCount}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="notice-pagination">
                <Button onClick={() => setPage(page - 1)} disabled={page === 1}>이전</Button>
                <span>Page {page} of {totalPages}</span>
                <Button onClick={() => setPage(page + 1)} disabled={page === totalPages}>다음</Button>
            </div>
        </div>
    );
}
