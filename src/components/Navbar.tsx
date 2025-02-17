import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Search, UserPlus } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Hammer className="w-8 h-8 text-primary-500" />
            <span className="text-xl font-bold text-primary-500">TukangKu</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/tukangs" className="flex items-center space-x-1 text-gray-600 hover:text-primary-500">
              <Search className="w-5 h-5" />
              <span>Cari Tukang</span>
            </Link>
            
            <Link to="/register" className="flex items-center space-x-1 text-gray-600 hover:text-primary-500">
              <UserPlus className="w-5 h-5" />
              <span>Daftar sebagai Tukang</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;