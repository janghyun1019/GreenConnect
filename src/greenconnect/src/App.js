import React from "react";
import { BrowserRouter, Route, Routes, useInRouterContext } from "react-router-dom";

import Header from "./common/Header";
import Footer from "./common/Footer";
import Main from "./main/main";


function App() {
  const inRouter = useInRouterContext();
  const RouterWrapper = inRouter ? React.Fragment : BrowserRouter;

  return (
    <RouterWrapper basename={!inRouter ? process.env.PUBLIC_URL : undefined}>
      <div className="app-container">
        <Header />
        <Routes>
          {/* 메인 및 인증 관련 페이지 */}
          <Route path="/" element={<Main />} />


          {/* 추가된 페이지 */}

        </Routes>
        <Footer />
      </div>
    </RouterWrapper>
  );
}

export default App;
