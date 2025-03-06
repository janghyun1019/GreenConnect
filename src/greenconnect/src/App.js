import PostDetail from "./postDetail/PostDetail";
import SmartEditor from "./postDetail/SmartEditor";
import MainPage from "./mainpageTemp1111/MainPage";
import WritePost from "./postDetail/WritePost";
import { Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    
      <Routes>
        <Route path="/writePost" element={<WritePost />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    
  );
}

export default App;
