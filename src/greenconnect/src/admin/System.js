import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from './components/AdminSidebar';

function System() {
    const [membershipData, setMembershipData] = useState({});
    const [siteDesign, setSiteDesign] = useState({});
    const [banners, setBanners] = useState([]);
    const [serverStatus, setServerStatus] = useState({});
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        axios.get('/admin/system/membership')
            .then(response => setMembershipData(response.data))
            .catch(error => console.error('Error fetching membership data:', error));

        axios.get('/admin/system/design')
            .then(response => setSiteDesign(response.data))
            .catch(error => console.error('Error fetching design data:', error));

        axios.get('/admin/system/banners')
            .then(response => setBanners(response.data))
            .catch(error => console.error('Error fetching banners:', error));

        axios.get('/admin/system/server-status')
            .then(response => setServerStatus(response.data))
            .catch(error => console.error('Error fetching server status:', error));

        axios.get('/admin/system/notices')
            .then(response => setNotices(response.data))
            .catch(error => console.error('Error fetching notices:', error));
    }, []);

    const handleAddNotice = () => {
        const newNotice = { noticeTitle: '새 공지', noticeContent: '내용' }; // 필드 이름 수정
        console.log('Sending notice:', newNotice); // 디버깅용 로그
        axios.post('/admin/system/notices', newNotice)
            .then(response => {
                console.log('Notice added:', response.data);
                setNotices([...notices, response.data]);
            })
            .catch(error => console.error('Error adding notice:', error));
    };

    return (
        <div className="systemContainer">
            <AdminSidebar />
            <div className="systemContent">
                <div className="section">
                    <h2>멤버쉽 및 정책 설정</h2>
                    <p>현재 설정: {membershipData.policy}</p>
                </div>
                <div className="section">
                    <h2>사이트 디자인 및 콘텐츠 관리</h2>
                    <p>테마: {siteDesign.theme}</p>
                </div>
                <div className="section">
                    <h2>메인 페이지 배너 관리</h2>
                    {banners.map(banner => (
                        <div key={banner.bannerId}>{banner.bannerTitle}</div> // bannerId, bannerTitle 사용
                    ))}
                </div>
                <div className="section">
                    <h2>서버 상태 및 보안 모니터링</h2>
                    <p>상태: {serverStatus.status}</p>
                </div>
                <div className="section">
                    <h2>공지사항 관리</h2>
                    <button onClick={handleAddNotice}>공지 추가</button>
                    {notices.map(notice => (
                        <div key={notice.noticeId}>{notice.noticeTitle} - {notice.noticeContent}</div> // noticeId, noticeTitle, noticeContent 사용
                    ))}
                </div>
            </div>
        </div>
    );
}

export default System;