import React from 'react';
import headersvg from '../../assets/header.svg'

function Header() {
  return (
    <header className="w-full relative">
      <div className="h-[46vh] max-h-[46vh] relative">
        <img className="w-full h-full object-cover" src={headersvg} alt="Mar Azul Arts" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
    </header>
  );
}

export default Header;
