import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const GarakMarketSearch = () => {
  const [date, setDate] = useState("2025-03-10");
  const [product, setProduct] = useState("양파");
  const [unit, setUnit] = useState("1키로");
  const [selectedProduct, setSelectedProduct] = useState("양파");

  const handleProductSelect = (productName) => {
    setSelectedProduct(productName);
  };

  const handleSearch = () => {
    console.log("검색 실행:", { date, product: selectedProduct, unit });
  };

  return (
    <div className="border p-4 rounded-lg flex items-center justify-between w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="border p-2 rounded-md w-32"
          placeholder="검색어 입력"
        />
        <FiSearch className="text-gray-600 text-xl cursor-pointer" onClick={handleSearch} />
        <input
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="border p-2 rounded-md w-16 text-center"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">최근거래일</button>
        <button
          className={`px-4 py-2 rounded-md ${selectedProduct === "양파" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => handleProductSelect("양파")}
        >
          양파
        </button>
        <button
          className={`px-4 py-2 rounded-md ${selectedProduct === "배추" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => handleProductSelect("배추")}
        >
          배추
        </button>
      </div>
      
      <button className="flex items-center text-gray-500 text-sm">
        <FiSearch className="mr-1" /> 조회
      </button>
    </div>
  );
};

export default GarakMarketSearch;
