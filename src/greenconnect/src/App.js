import PostDetail from "./postDetail/PostDetail";
import SmartEditor from "./postDetail/SmartEditor";
import MainPage from "./mainpageTemp1111/MainPage";
import WritePost from "./postDetail/WritePost";
import { Router, Routes, Route } from "react-router-dom";
import Signup from "./Page/Signup/Signup.js";
import Login from "./Page/Signup/Login.js";
import FindId from "./Page/Signup/FindId.js";
import FindPassword from "./Page/Signup/FindPassword.js";
import ResetPassword from "./Page/Signup/ResetPassword.js";

function App() {
  return (
    
      <Routes>
        
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />

        <Route path="/writePost" element={<WritePost />} />
        <Route path="/postDetail" element={<PostDetail />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findId" element={<FindId />} />
        <Route path="/findPassword" element={<FindPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />

      </Routes>
    
  );
}
export default App;
