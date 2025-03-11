import React from 'react';
import MainSlide from './MainSlide/MainSlide';
import MainCmenu from './mainCmenu/mainCmenu'; // 대문자로 변경
import MainAPIGraph from './mainAPIGraph/mainAPIGraph';
import MainSellerApply from './mainSellerApply/mainSellerApply';


function Mainbody() {
  return (
    <main style={{ flex: 1 }}>
      <MainSlide />
      <MainCmenu /> {/* 대문자로 변경 */}
      <MainAPIGraph />
      <MainSellerApply />
    </main>
  );
}

export default Mainbody;
