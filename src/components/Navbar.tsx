import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Search, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, signInWithGoogle, signOut } = useAuth();

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
            
            {user ? (
              <>
                <Link to="/register" className="flex items-center space-x-1 text-gray-600 hover:text-primary-500">
                  <UserPlus className="w-5 h-5" />
                  <span>Daftar sebagai Tukang</span>
                </Link>
                <button 
                  onClick={signOut}
                  className="flex items-center space-x-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <span>Keluar</span>
                </button>
              </>
            ) : (
              <button 
                onClick={signInWithGoogle}
                className="flex items-center space-x-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <LogIn className="w-5 h-5" />
                <span>Masuk dengan Google</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;