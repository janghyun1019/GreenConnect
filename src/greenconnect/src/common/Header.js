import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import { LuShoppingCart, LuSearch } from "react-icons/lu";
import { FaBars } from 'react-icons/fa';

// 이미지들
import logo from '../images/common/logo.png';
import bookmarkImg from '../images/common/btn_bm01.jpg';
import sellercenterBtn from '../images/common/btn_sc01.jpg';
import sellImg from '../images/common/btn_sell.jpg';
import shopImg from '../images/common/btn_shop.jpg';
import greentalkImg from '../images/common/btn_greentalk.jpg';

// 드로어(모달) 컴포넌트
import ModalContent from './ModalContent';

function Header() {
	// 즐겨찾기 상태
	const [isBookmarked, setIsBookmarked] = useState(false);
	// 햄버거 드로어 상태
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	// 즐겨찾기 버튼 클릭
	const handleBookmarkClick = () => {
		setIsBookmarked(!isBookmarked);
		alert(isBookmarked ? '즐겨찾기가 해제되었습니다.' : '즐겨찾기에 추가되었습니다!');
	};

	// 드로어 열기/닫기
	const openDrawer = () => setIsDrawerOpen(true);
	const closeDrawer = () => setIsDrawerOpen(false);

	return (
		<header className="header">


			{/* 상단 바 (즐겨찾기, 로그인/회원가입, 내상점, 판매자센터) */}
			<div className="header-inner">
				<div className="top-bar">
					{/* 왼쪽: 즐겨찾기 */}
					<div className="top-left">
						<button className="bookmark-btn" onClick={handleBookmarkClick}>
							<img src={bookmarkImg} alt="즐겨찾기 버튼" className="bookmark-img" />
						</button>
					</div>
					{/* 오른쪽: 로그인/회원가입, 내상점, 판매자센터 */}
					<div className="top-right">
						<Link to="/login" className="top-link">로그인/회원가입</Link>
						<span className="divider">|</span>
						<Link to="/mypage" className="top-link">내상점</Link>
						<Link to="/seller-center" className="seller-center-button">
							<img src={sellercenterBtn} alt="판매자센터" />
						</Link>
					</div>
				</div>
			</div>

			{/* 가로 구분선 */}
			<div className="top-bar-separator"></div>

			{/* 메인 바 (로고 - 검색창 - 아이콘 3개 한 줄) */}
			<div className="header-inner2">
				{/* 로고 영역 */}
				<div className="logo-area">
					<Link to="/">
						<img src={logo} alt="그커장터 로고" className="logo-img" />
					</Link>
				</div>

				{/* 검색 영역 */}
				<div className="search-area">
					<div className="search-input-wrapper">
						<input type="text" className="search-input" placeholder="상품명, 상점명 입력" />
						<LuSearch className="search-input-icon" />
					</div>
				</div>

				{/* 메뉴 영역 (판매하기, 내상점, 그린톡) */}
				<div className="menu-area">
					<Link to="/sell" className="menu-link">
						<img src={sellImg} alt="판매하기" className="menu-img-sell" />
					</Link>
					<Link to="/shop" className="menu-link">
						<img src={shopImg} alt="내상점" className="menu-img-shop" />
					</Link>
					<Link to="/greentalk" className="menu-link">
						<img src={greentalkImg} alt="그린톡" className="menu-img-greentalk" />
					</Link>
				</div>
			</div>

			{/* 하단 (햄버거 버튼) */}
			<div className="header-inner2">
				<div className="bottom-bar">
					<button className="hamburger-btn" onClick={openDrawer}>
						<FaBars />
					</button>
				</div>
			</div>
			{/* 드로어(슬라이드 메뉴) */}
			{isDrawerOpen && <ModalContent closeDrawer={closeDrawer} />}
		</header>
	);
}

export default Header;
