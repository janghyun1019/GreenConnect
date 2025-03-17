import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Admin.css';

// 관리자 페이지의 사이드바 컴포넌트로, 시스템 설정 메뉴를 포함한 네비게이션을 제공
function AdminSidebar() {
    return (
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
    );
}

export default AdminSidebar;