import React, { useState } from 'react';
import './mainRecProduct.css';

const categories = [
  { name: '채소', off: 'icon_off_01.jpg', on: 'icon_on_01.jpg' },
  { name: '과일', off: 'icon_off_02.jpg', on: 'icon_on_02.jpg' },
  { name: '나물/버섯', off: 'icon_off_03.jpg', on: 'icon_on_03.jpg' },
  { name: '꿀/뿌리', off: 'icon_off_04.jpg', on: 'icon_on_04.jpg' },
  { name: '곡물/견과', off: 'icon_off_05.jpg', on: 'icon_on_05.jpg' },
];

function MainRecProduct() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="main-rec-product">
      {categories.map((category, index) => (
        <div
          key={index}
          className="category-item"
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          <img
            src={require(`./images/${hovered === index ? category.on : category.off}`)}
            alt={category.name}
            className="category-icon"
          />
        </div>
      ))}
    </div>
  );
}

export default MainRecProduct;
