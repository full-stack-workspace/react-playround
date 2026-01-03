import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">Teek</div>
          <nav className="space-x-6">
            <a href="/" className="text-gray-700 hover:text-gray-900 font-medium">Home</a>
            <a href="/posts" className="text-gray-700 hover:text-gray-900 font-medium">Posts</a>
            <a href="/shopping-cart" className="text-gray-700 hover:text-gray-900 font-medium">Shopping Cart</a>
            <a href="/about" className="text-gray-700 hover:text-gray-900 font-medium">About</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
