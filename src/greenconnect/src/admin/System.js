import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from './components/AdminSidebar';

function System() {
    const [membershipData, setMembershipData] = useState(null);
    const [siteDesign, setSiteDesign] = useState(null);
    const [banners, setBanners] = useState([]);
    const [serverStatus, setServerStatus] = useState(null);
    const [notices, setNotices] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [membershipRes, designRes, bannersRes, statusRes, noticesRes] = await Promise.all([
                    axios.get('/admin/system/membership'),
                    axios.get('/admin/system/design'),
                    axios.get('/admin/system/banners'),
                    axios.get('/admin/system/server-status'),
                    axios.get('/admin/system/notices'),
                ]);
                setMembershipData(membershipRes.data);
                setSiteDesign(designRes.data);
                setBanners(bannersRes.data);
                setServerStatus(statusRes.data);
                setNotices(noticesRes.data);
            } catch (err) {
                setError('데이터를 불러오는 데 실패했습니다: ' + err.message);
                console.error('Error fetching system data:', err);
            }
        };
        fetchData();
    }, []);

    const handleAddNotice = async () => {
        const newNotice = { noticeTitle: '새 공지', noticeContent: '내용' };
        try {
            const response = await axios.post('/admin/system/notices', newNotice);
            setNotices([...notices, response.data]);
            console.log('Notice added:', response.data);
        } catch (err) {
            setError('공지 추가 실패: ' + err.message);
            console.error('Error adding notice:', err);
        }
    };

    return (
        <div className="systemContainer">
            <AdminSidebar />
            <div className="systemContent">
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <div className="section">
                    <h2>멤버쉽 및 정책 설정</h2>
                    {membershipData ? (
                        <p>현재 설정: {membershipData.policy || '설정 없음'}</p>
                    ) : (
                        <p>로딩 중...</p>
                    )}
                </div>
                <div className="section">
                    <h2>사이트 디자인 및 콘텐츠 관리</h2>
                    {siteDesign ? (
                        <p>테마: {siteDesign.theme || '테마 없음'}</p>
                    ) : (
                        <p>로딩 중...</p>
                    )}
                </div>
                <div className="section">
                    <h2>메인 페이지 배너 관리</h2>
                    {banners.length > 0 ? (
                        banners.map(banner => (
                            <div key={banner.bannerId}>{banner.bannerTitle}</div>
                        ))
                    ) : (
                        <p>배너 없음</p>
                    )}
                </div>
                <div className="section">
                    <h2>서버 상태 및 보안 모니터링</h2>
                    {serverStatus ? (
                        <p>상태: {serverStatus.status || '상태 없음'}</p>
                    ) : (
                        <p>로딩 중...</p>
                    )}
                </div>
                <div className="section">
                    <h2>공지사항 관리</h2>
                    <button onClick={handleAddNotice}>공지 추가</button>
                    {notices.length > 0 ? (
                        notices.map(notice => (
                            <div key={notice.noticeId}>
                                {notice.noticeTitle} - {notice.noticeContent}
                            </div>
                        ))
                    ) : (
                        <p>공지사항 없음</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default System;