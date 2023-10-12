import React from 'react';
import headersvg from '../../assets/header.svg'

function Header() {
  return (
    <header className="h-[36vh] w-full flex items-center justify-center">
      <img className="w-full h-full object-contain" src={headersvg} alt="Mar Azul Arts" />
    </header>
  );
}

export default Header;
