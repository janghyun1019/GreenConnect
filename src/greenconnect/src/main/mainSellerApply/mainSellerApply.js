import React from "react";
import "./mainSellerApply.css";
import ce01 from "./images/ce01.png";
import ce02 from "./images/ce02.png";
import ce03 from "./images/ce03.png";

export default function MainSellerApply() {
  return (
    <div className="seller-container">
      <div className="seller-content">
        <img src={ce01} alt="title" className="seller-title" />
      </div>
      <div className="apply-section">
        <img src={ce02} alt="faq section" className="seller-faq" />
        <img src={ce03} alt="apply button" className="apply-button" />
      </div>
    </div>
  );
}
