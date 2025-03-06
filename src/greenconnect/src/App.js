import Signup from "./Page/Signup/Signup.js";
import Login from "./Page/Signup/Login.js";
import FindId from "./Page/Signup/FindId.js";
import FindPassword from "./Page/Signup/FindPassword.js";
import ResetPassword from "./Page/Signup/ResetPassword.js";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./main/main";



function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
      // return <Merge/>;
  // return <Signup/>;
  //return <Login/>;
  // return <FindId/>;
  // return<FindPassword/>;
  // return<ResetPassword/>;

}

export default App;