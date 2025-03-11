import React from "react";
import Signup from "./Page/Signup/Signup.js";
import Login from "./Page/Signup/Login.js";
import FindId from "./Page/Signup/FindId.js";
import FindPassword from "./Page/Signup/FindPassword.js";
import ResetPassword from "./Page/Signup/ResetPassword.js";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { BrowserRouter, Route, Routes, useInRouterContext } from "react-router-dom";
import Main from "./main/main";


function App() {
  // 이미 Router 컨텍스트 내에 있는지 확인합니다.
  const inRouter = useInRouterContext();
  const RouterWrapper = inRouter ? React.Fragment : BrowserRouter;

  return (
    <RouterWrapper basename={!inRouter ? process.env.PUBLIC_URL : undefined}>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
        <Footer />
      </div>
    </RouterWrapper>
  );
  // return <Merge/>;
  // return <Signup/>;
  // return <Login/>;
  // return <FindId/>;
  // return <FindPassword/>;
  // return <ResetPassword/>;
}

export default App;
