import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { LuShoppingCart, LuSearch } from "react-icons/lu";

// 이미지 import
import logo from '../images/common/logo.png';
import bookmarkImg from '../images/common/btn_bm01.jpg';
import sellercenterBtn from '../images/common/btn_sc01.jpg';
import sellImg from '../images/common/btn_sell.jpg';
import shopImg from '../images/common/btn_shop.jpg';
import greentalkImg from '../images/common/btn_greentalk.jpg';

function Header() {
  // 즐겨찾기 상태 관리
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 즐겨찾기 버튼 클릭 핸들러
  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
    if (!isBookmarked) {
      alert('즐겨찾기에 추가되었습니다!');
    } else {
      alert('즐겨찾기가 해제되었습니다.');
    }
  };

  return (
    <header className="header">
      {/* 가운데 정렬용 컨테이너 */}
      <div className="header-inner">
        {/* 상단 바 */}
        <div className="top-bar">
          <div className="top-left">
            <button className="bookmark-btn" onClick={handleBookmarkClick}>
              <img 
                src={bookmarkImg} 
                alt="즐겨찾기 버튼" 
                className="bookmark-img"
              />
            </button>
          </div>
          <div className="top-right">
            <Link to="/login" className="top-link">로그인/회원가입</Link>
            <span className="divider">|</span>
            <Link to="/mypage" className="top-link">내상점</Link>
            <Link to="/seller-center" className="seller-center-button">
              <img src={sellercenterBtn} alt="판매자센터" />
            </Link>
          </div>
        </div>

        {/* 메인 바 */}
        <div className="main-bar">
          {/* 로고 영역 */}
          <div className="logo-area">
            <Link to="/">
              <img 
                src={logo} 
                alt="그커장터 로고" 
                className="logo-img" 
              />
            </Link>
          </div>

          {/* 검색 영역 */}
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
            <Link to="/sell" className="menu-link">
              <img src={sellImg} alt="판매하기" className="menu-img" />
            </Link>
            <Link to="/shop" className="menu-link">
              <img src={shopImg} alt="내상점" className="menu-img" />
            </Link>
            <Link to="/greentalk" className="menu-link">
              <img src={greentalkImg} alt="그린톡" className="menu-img" />
            </Link>
            <Link to="/cart" className="menu-link cart-icon">
              <LuShoppingCart />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
