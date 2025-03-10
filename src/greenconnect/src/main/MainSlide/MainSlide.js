import React, { useState, useEffect, useRef } from 'react';
import './MainSlide.css';

// 이미지 파일 import (실제 경로에 맞게 수정)
import mainSlide01 from './images/mainSlide01.jpg';
import mainSlide02 from './images/mainSlide02.jpg';
import mainSlide03 from './images/mainSlide03.jpg';
import mainSlide04 from './images/mainSlide04.jpg';
import mainSlide05 from './images/mainSlide05.jpg';
import mainSlide06 from './images/mainSlide06.jpg';

// 원본 슬라이드 배열
const originalSlides = [
  mainSlide01,
  mainSlide02,
  mainSlide03,
  mainSlide04,
  mainSlide05,
  mainSlide06,
];

// 설정 값
const AUTO_PLAY_DELAY = 3000; // 3초마다 전환
const TRANSITION_SPEED = 0.5; // 전환 속도 (초)

const MainSlide = () => {
  const [currentIndex, setCurrentIndex] = useState(2); // 무한 루프 고려
  const [isTransition, setIsTransition] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(2);
  const [itemWidth, setItemWidth] = useState(580 * 2 + 16); // 기본 크기
  const autoPlayRef = useRef(null);

  // ✅ 반응형 설정: 화면 크기에 따라 슬라이드 개수 변경
  useEffect(() => {
    const updateSettings = () => {
      if (window.innerWidth <= 768) {
        setItemsToShow(1);
        setItemWidth(window.innerWidth - 80); // 모바일에서는 화면 꽉 차게
      } else {
        setItemsToShow(2);
        setItemWidth(580 * 2 + 16); // 2개 슬라이드 크기 유지
      }
    };

    window.addEventListener('resize', updateSettings);
    updateSettings(); // 초기 설정

    return () => window.removeEventListener('resize', updateSettings);
  }, []);

  // 자동 전환 (3초마다 1개 이동)
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, AUTO_PLAY_DELAY);

    return () => clearInterval(autoPlayRef.current);
  }, []);

  // transition 끝나면 무한 루프 처리
  const handleTransitionEnd = () => {
    if (currentIndex >= originalSlides.length + 2) {
      setIsTransition(false);
      setCurrentIndex(2);
    } else if (currentIndex < 2) {
      setIsTransition(false);
      setCurrentIndex(originalSlides.length);
    }
  };

  // 경계 점프 후 transition 복구
  useEffect(() => {
    if (!isTransition) {
      setTimeout(() => setIsTransition(true), 50);
    }
  }, [isTransition]);

  // 이동 시 translateX 적용
  const sliderStyle = {
    transform: `translateX(-${currentIndex * (itemWidth / itemsToShow)}px)`,
    transition: isTransition ? `transform ${TRANSITION_SPEED}s ease-in-out` : 'none',
  };

  return (
    <div className="main-slide-container">
      <button className="arrow-button prev" onClick={() => setCurrentIndex(prev => prev - 1)}>&lt;</button>
      <div className="slider-wrapper">
        <div className="slider" style={sliderStyle} onTransitionEnd={handleTransitionEnd}>
          {originalSlides.concat(originalSlides).map((imgSrc, idx) => (
            <div className="slide-item" key={idx} style={{ width: `${itemWidth / itemsToShow}px` }}>
              <img src={imgSrc} alt={`slide-${idx}`} />
            </div>
          ))}
        </div>
      </div>
      <button className="arrow-button next" onClick={() => setCurrentIndex(prev => prev + 1)}>&gt;</button>
    </div>
  );
};

export default MainSlide;
