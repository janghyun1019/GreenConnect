import React from 'react';
import MainSlide from './MainSlide/MainSlide';
import MainRecProduct from './mainRecProduct/mainRecProduct'; // 대문자로 변경

function Mainbody() {
  return (
    <main style={{ flex: 1 }}>
      <MainSlide />
      <MainRecProduct /> {/* 대문자로 변경 */}
    </main>
  );
}

export default Mainbody;
