import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <ul className="sidebar-menu">
            <li><Link to="/Mypage">프로필관리</Link></li>
            <li><Link to="/Cart">장바구니</Link></li>
            <li><Link to="/Address">주소/결재수단</Link></li>
            <li><Link to="/Post">작성글 목록</Link></li>
            <li><Link to="/likes">찜한 목록</Link></li>
        </ul>
    );
}

export default Sidebar;