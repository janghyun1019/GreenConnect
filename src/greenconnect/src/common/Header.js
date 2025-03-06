import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { LuShoppingCart, LuSearch } from "react-icons/lu";

// ★ 로고 이미지 import (src/images/common/logo.png)
import logo from '../images/common/logo.png';

function Header() {
  return (
    <header className="header">
      {/* 상단 바 */}
      <div className="top-bar">
        <div className="top-left">
          <span className="bookmark">즐겨찾기</span>
        </div>
        <div className="top-right">
          <Link to="/login" className="top-link">로그인/회원가입</Link>
          <span className="divider">|</span>
          <Link to="/mypage" className="top-link">내상점</Link>
          {/* 판매자센터 녹색 버튼 (이미지) */}
          <Link to="/seller-center" className="seller-center-button">
            {/* seller_center.png가 public 폴더에 있다면 그대로 사용 가능 */}
            <img src="/seller_center.png" alt="판매자센터" />
          </Link>
        </div>
      </div>

      {/* 메인 바 */}
      <div className="main-bar">
        {/* 로고 영역 */}
        <div className="logo-area">
          <Link to="/">
            {/* 로고 이미지를 import로 불러와 사용 */}
            <img 
              src={logo} 
              alt="그커장터 로고" 
              className="logo-img" 
            />
          </Link>
        </div>

        {/* 검색 영역 (돋보기 아이콘이 오른쪽에 표시됨) */}
        <div className="search-area">
          <div className="search-input-wrapper">
            <input 
              type="text" 
              className="search-input" 
              placeholder="검색어를 입력하세요" 
            />
            <LuSearch className="search-input-icon" />
          </div>
        </div>

        {/* 메뉴 영역 */}
        <div className="menu-area">
          <Link to="/sell" className="menu-link">판매하기</Link>
          <Link to="/shop" className="menu-link">내상점</Link>
          <Link to="/greentalk" className="menu-link">그린톡</Link>
          <Link to="/cart" className="menu-link cart-icon">
            <LuShoppingCart />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
