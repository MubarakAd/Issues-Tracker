'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi'; // Hamburger and close icons from react-icons
import DropDown from '../dropDown/dropDown';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-blue-600 px-8 py-4 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Issue Tracker</h1>

        {/* Hamburger icon visible on mobile */}
        <button
          onClick={toggleMenu}
          className="text-white text-3xl md:hidden focus:outline-none"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Links, shown on desktop and hidden on mobile */}
        <div className="hidden md:flex gap-6 text-white">
          <a href="/" className="hover:text-blue-300 transition-colors duration-300">Dashboard</a>
          <a href="/IssuePage" className="hover:text-blue-300 transition-colors duration-300">Issue</a>
          <DropDown/>
        </div>
      </div>

      {/* Mobile menu, shown when menuOpen is true */}
      {menuOpen && (
        <div className="flex flex-col items-center gap-4 mt-4 md:hidden">
          <Link href="/" className="text-white hover:text-blue-300 transition-colors duration-300">Dashboard</Link>
          <Link href="/IssuePage" className="text-white hover:text-blue-300 transition-colors duration-300">Issue</Link>
          <DropDown/>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
