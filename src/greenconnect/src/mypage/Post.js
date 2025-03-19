import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from './components/Sidebar';

function Post() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = 1;

    useEffect(() => {
        const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            // const token = localStorage.getItem("token"); // localStorage에서 토큰 가져오기
            // if (!token) {
            // throw new Error("인증 토큰이 없습니다.");
            // }

            // const response = await axios.get(`/mypage/post/user/${userId}`, {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },
            // });
            const tempToken = "your_temporary_test_token"; // 임시 토큰 하드코딩

            const response = await axios.get(`/mypage/post/user/${userId}`, {
                headers: {
                Authorization: `Bearer ${tempToken}`,
                },
            });
            setPosts(response.data);
        } catch (err) {
            if (err.response && err.response.status === 401) {
            setError("인증 실패: 다시 로그인해주세요.");
            // 로그인 페이지로 리다이렉트
            } else {
            setError("게시글을 불러오는 중 에러가 발생했습니다.");
            }
            console.error("Error fetching posts:", err);
        } finally {
            setLoading(false);
        }
        };

        fetchPosts();
    }, [userId]);

    if (loading) return <div className="loading">로딩 중...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="my-posts-container">
            <Sidebar />
            <div className="main_content">
        <h2>내가 작성한 글</h2>
        {posts.length === 0 ? (
            <p className="no-posts">작성한 글이 없습니다.</p>
        ) : (
            <div className="posts-grid">
            {posts.map((post) => (
                <div className="post-card" key={post.postId}>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">
                    {post.content.substring(0, 100)}
                    {post.content.length > 100 && "..."}
                </p>
                <div className="post-meta">
                    <span className="post-date">
                    작성일: {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                </div>
                </div>
            ))}
            </div>
        )}
        </div>
        </div>
    );
}

export default Post;