import { useState } from "react";
import "./mainAPIGraph.css";
import temp01 from "./images/temp01.jpg";
import temp02 from "./images/temp02.jpg";

export default function MainAPIGraph() {
  const [activeTab, setActiveTab] = useState("가락시장");
  const tabs = ["가락시장", "전국도매시장", "산지공판장"];

  return (
    <div className="main-container">
      <div className="chart-wrapper">
        <div className="chart-container">
          <img src={temp01} alt="Graph 1" className="temp-image1" />
        </div>
        <div className="chart-container">
          <img src={temp02} alt="Graph 2" className="temp-image2" />
        </div>
      </div>
    </div>
  );
}