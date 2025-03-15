import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CuSupport = () => {
    const [reports, setReports] = useState([]);
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        axios.get('/admin/CustomerSupport/reports')
            .then(response => setReports(response.data))
            .catch(error => console.error('Error fetching reports:', error));

        axios.get('/admin/CustomerSupport/faqs')
            .then(response => setFaqs(response.data))
            .catch(error => console.error('Error fetching FAQs:', error));
    }, []);

    const handleDeletePost = (postId) => {
        axios.post('/admin/CustomerSupport/posts/delete', { postId })
            .then(() => {
                setReports(reports.map(report => 
                    report.reportedPostId === postId ? { ...report, reportResult: '삭제됨' } : report
                ));
            })
            .catch(error => console.error('Error deleting post:', error));
    };

    return (
        <div className="customer-support-container">
            <div className="adminAside">
                <ul>
                    <li><Link to="/Admin">관리자 홈</Link></li>
                    <li><Link to="/Customer">사용자관리</Link></li>
                    <li><Link to="/Trade">거래관리</Link></li>
                    <li><Link to="/Quality">품질관리</Link></li>
                    <li><Link to="/System">시스템설정</Link></li>
                    <li><Link to="/CuSupport">고객지원</Link></li>
                </ul>
            </div>
            <div className="main-content">
                <h1>고객 지원</h1>
                <div className="report-section">
                {reports.length > 0 ? (
                    reports.map(report => (
                        <div key={`${report.userId}-${report.reportedUserId}`} className="report-item">
                            <div>신고자: {report.userId}</div>
                            <div>신고 대상: {report.reportedUserNickName} ({report.reportedUserId})</div>
                            <div>신고 사유: {report.reportContent}</div>
                            <div>결과: {report.reportResult || '미처리'}</div>
                                        <div>처리 날짜: {report.reportCreatedAt ? new Date(report.reportCreatedAt).toLocaleString() : '미처리'}</div>
                                        {report.reportedPostId && (
                                <button onClick={() => handleDeletePost(report.reportedPostId)}>
                                    게시글 삭제
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="no-reports">신고된 내용이 없습니다.</div>
                )}
                </div>
                <div className="faq-section">
                    <h2>FAQ</h2>
                    {faqs.map(faq => (
                        <div key={faq.faqId} className="faq-item">
                            <div className="faq-title">{faq.faqTitle}</div>
                            <div className="faq-content">{faq.faqContent}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CuSupport;