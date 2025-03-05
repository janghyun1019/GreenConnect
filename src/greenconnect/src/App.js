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
}

export default App;