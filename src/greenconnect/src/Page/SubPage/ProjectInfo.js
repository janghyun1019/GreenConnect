import React from "react";
import "../../common/commonPage.css";
import info01 from "../../images/info/info_01.jpg";
import info02 from "../../images/info/info_02.jpg";
import info03 from "../../images/info/info_03.jpg";
import info04 from "../../images/info/info_04.jpg";
import info05 from "../../images/info/info_05.jpg";
import info06 from "../../images/info/info_06.jpg";

const ProjectInfo = () => {
	return (
		<div className="container common-page">
			<div className="title">
				<i className="fa-solid fa-leaf"></i> Green Connect Project
			</div>
			<div className="titlesub">농산물 가격추이 시세 정보 분석 기반의 농산물 직거래 시스템 구축 프로젝트입니다.</div>
			
			<div className="substance">
				<div className="titlesub02">누구나 사용하기 쉬운 농수산물 직거래 장터를 제공합니다.</div>
				
				<h3 className="subtitle">주제 요약</h3>
				<div className="to_text">
					<img src={info01} alt="주제 요약 이미지" className="info-image" />
				</div>
				
				<h3 className="subtitle">주제 선택 이유</h3>
				<div className="to_text">
					<img src={info02} alt="주제 요약 이미지" className="info-image" />
				</div>
				
				<h3 className="subtitle">주제 선택 목적</h3>
				<div className="to_text">
					<img src={info03} alt="주제 요약 이미지" className="info-image" />
				</div>
				
				<h3 className="subtitle">서비스 핵심기능</h3>
				<div className="to_text">
					<img src={info04} alt="주제 요약 이미지" className="info-image" />
				</div>
				
				<h3 className="subtitle">GreenPay(안전페이)-신뢰 기반 결제 시스템</h3>
				<div className="to_text">
					<img src={info05} alt="주제 요약 이미지" className="info-image" />
				</div>
				
				<h3 className="subtitle">서비스 기대 효과</h3>
				<div className="to_text">
					<img src={info06} alt="주제 요약 이미지" className="info-image" />
				</div>
			</div>
		</div>
	);
};

export default ProjectInfo;
