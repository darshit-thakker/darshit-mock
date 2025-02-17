import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaSearch } from 'react-icons/fa';
import { NavbarProps } from '../types/types';

const Navbar: React.FC<NavbarProps> = ({ onToggleFilter, showFilterToggle = true, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <nav className="bg-white p-4 text-gray-400 flex justify-between items-center flex-wrap shadow-lg fixed top-0 left-0 w-full z-50 h-15">
      <div className="flex items-center space-x-6">
        {showFilterToggle && (
          <button onClick={onToggleFilter} className="navbtn text-black transition duration-300 bg-amber-200">
            <FaFilter />
          </button>
        )}
        <Link to="/" className="font-bold transition duration-300 text-black">Home</Link>
        <Link to="/favourites" className="font-bold transition duration-300 text-black">Favourites</Link>
        {/* <Link to="/shop" className="text-xl hover:text-gray-300 transition duration-300">Shop</Link> */}
      </div>
      <div className="flex items-center space-x-4 mt-4 md:mt-0 flex-grow justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 pl-10 rounded-full border-1 text-black placeholder-gray focus:outline-0.5 focus:ring-grey shadow-lg transition duration-300 w-full h-8"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center space-x-5 mt-4 md:mt-0">
      <Link to="/cart" className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-xl transition duration-300 gap-x-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </Link>        
        <Link to="/login" className="font-bold transition duration-300 text-black">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
