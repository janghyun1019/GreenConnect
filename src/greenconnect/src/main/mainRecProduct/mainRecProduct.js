import React from "react";
import "./mainRecProduct.css";
import temp01 from "./images/tempimg01.jpg";


export default function mainRecProduct() {
  return (
    <div className="recProduct-container">
      <div className="recProduct-content">
        <img src={temp01} alt="title" className="recProduct-title" />
      </div>
    </div>
  );
}