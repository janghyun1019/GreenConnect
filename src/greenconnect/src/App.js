import React from "react";
import { BrowserRouter, Route, Routes, useInRouterContext } from "react-router-dom";
import Signup from "./Page/Signup/Signup.js";
import Login from "./Page/Signup/Login.js";
import FindId from "./Page/Signup/FindId.js";
import FindPassword from "./Page/Signup/FindPassword.js";
import ResetPassword from "./Page/Signup/ResetPassword.js";
import Header from "./common/Header.js";
import Footer from "./common/Footer.js";
import Main from "./main/main.js";
import logo from "./logo.png";
import "./App.css";

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
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/FindId" element={<FindId />} />
          <Route path="/FindPassword" element={<FindPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/FindId" element={<FindId />} />
          <Route path="/FindPassword" element={<FindPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
        </Routes>

        <div className="App">
          <header className="App-header">
            <h1>Green Connect Project</h1>
          </header>
        </div>

        <Footer />
      </div>
    </RouterWrapper>
  );
}

export default App;
