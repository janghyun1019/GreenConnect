import React, { useState } from 'react';
import './mainRecProduct.css';

const categories = [
  { name: '채소', off: 'icon_off_01.jpg', on: 'icon_on_01.jpg', link: '/' },
  { name: '과일', off: 'icon_off_02.jpg', on: 'icon_on_02.jpg', link: '/' },
  { name: '나물/버섯', off: 'icon_off_03.jpg', on: 'icon_on_03.jpg', link: '/' },
  { name: '꿀/뿌리', off: 'icon_off_04.jpg', on: 'icon_on_04.jpg', link: '/' },
  { name: '곡물/견과', off: 'icon_off_05.jpg', on: 'icon_on_05.jpg', link: '/' },
];

function MainRecProduct() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="main-rec-product">
      {categories.map((category, index) => (
        <a
          key={index}
          href={category.link}
          className="category-item"
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          <img
            src={require(`./images/${hovered === index ? category.on : category.off}`)}
            alt={category.name}
            className="category-icon"
          />
          <p>{category.name}</p>
        </a>
      ))}
    </div>
  );
}

export default MainRecProduct;
