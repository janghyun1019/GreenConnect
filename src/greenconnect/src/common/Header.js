import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../common/Header.css';
import { LuShoppingCart } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";


function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="header">
      {/* 로고 */}
      <div className="logo">
로고
      </div>



    </header>
  );
}

export default Header;
