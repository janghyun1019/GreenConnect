import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      {/* 상단 메뉴 */}
      <div className="footer-top-menu">
        <a href="/">회사소개</a>
        <span> | </span>
        <a href="/">이용약관</a>
        <span> | </span>
        <a href="/">개인정보처리방침</a>
        <span> | </span>
        <a href="/">이용안내</a>
      </div>

      <hr />

      {/* 메인 정보 영역 */}
      <div className="footer-content">
        {/* 왼쪽: 프로젝트/회사 정보 */}
        <div className="footer-info">
          <h2>그커마켓 프로젝트정보</h2>
          <p>팀명: 장현&nbsp; 팀원: 김도현 박철중 변준현 / 개인정보보호책임자: 장현</p>
          <p>사업자등록번호: 000-00-11111 &nbsp;|&nbsp; 통신판매업번호: 2025-충남 천안-1111</p>
          <p>주소: 충남 천안시 동남구 대흥로 215 7층,8층</p>
        </div>

        {/* 오른쪽: 고객센터 정보 */}
        <div className="footer-customer-center">
          <h2>고객센터</h2>
          <p className="footer-customer-phone">1566-9564</p>
          <p>운영시간 평일 09:00 ~ 18:00 (점심 12:00~13:00) / 공휴일 휴무</p>
          <p>
          	<a href="/">1:1 문의</a>
          	<span> | </span>
          	<a href="/">자주묻는질문</a>
          	<span> | </span>
          	<a href="/">운영정책</a>
          	<span> | </span>
        	<a href="/">이메일 무단수집거부</a>
          </p>
          <p>COPYRIGHT (C) GreenConnect project. All rights reserved.</p>
        </div>
      </div>

      <hr />

      {/* 하단 문구 */}
      <p className="footer-disclaimer">
        그커마켓은 이용자들에게 다양한 정보를 제공하기 위해 노력하고 있습니다.<br />본 사이트에 기재된
        정보는 예고 없이 변경될 수 있으며, 정확성 및 완전성을 보장하지 않습니다.
      </p>
    </footer>
  );
}

export default Footer;
