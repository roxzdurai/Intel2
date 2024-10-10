import React, { useState } from 'react';
import { FiBell, FiShare2, FiSearch } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Search query:', searchQuery);
  };

  return (
    <header className="bg-white py-2 px-6 fixed top-0 z-30 flex justify-between items-center shadow-md"
      style={{ width: 'calc(100% - 16rem)', marginLeft: '16rem' }}> {/* 16rem for sidebar */}
      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-1/3 border border-gray-300">
        <FiSearch className="text-gray-500 mr-2 w-4 h-4" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search Keyword"
          className="bg-transparent w-full focus:outline-none text-gray-700 placeholder-gray-500"
        />
      </form>

      {/* Right Icons */}
      <div className="flex items-center space-x-4">
        <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 border border-gray-300">
          <FiBell className="w-5 h-5 text-gray-500" />
        </button>
        <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 border border-gray-300">
          <FiShare2 className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
