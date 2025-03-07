// ModalContent.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ModalContent.css';

function ModalContent({ closeDrawer }) {
  return (
    // 오버레이(뒷배경) - 클릭 시 드로어 닫힘
    <div className="drawer-overlay" onClick={closeDrawer}>
      {/* 드로어(왼쪽 메뉴 영역) - 이벤트 전파 중지 */}
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        {/* 닫기 버튼 */}
        <button className="drawer-close-btn" onClick={closeDrawer}>
          X
        </button>

        {/* 실제 메뉴 목록 */}
        <ul className="drawer-menu">
          <li>
            <Link to="/login" onClick={closeDrawer}>로그인/회원가입</Link>
          </li>
          <li>
            <Link to="/sell" onClick={closeDrawer}>판매하기</Link>
          </li>
          <li>
            <Link to="/cart" onClick={closeDrawer}>장바구니</Link>
          </li>
          <li>
            <Link to="/mypage" onClick={closeDrawer}>내상점</Link>
          </li>

          <li className="drawer-divider"></li>

          <li className="drawer-submenu">
            <span>카테고리</span>
            <ul>
              <li><Link to="/category/fruit" onClick={closeDrawer}>과일</Link></li>
              <li><Link to="/category/vegetable" onClick={closeDrawer}>채소</Link></li>
              <li><Link to="/category/grain" onClick={closeDrawer}>쌀/잡곡</Link></li>
            </ul>
          </li>
          <li>
            <Link to="/brand" onClick={closeDrawer}>브랜드</Link>
          </li>
          <li>
            <Link to="/notice" onClick={closeDrawer}>공지사항</Link>
          </li>
          <li>
            <Link to="/event" onClick={closeDrawer}>이벤트</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ModalContent;
