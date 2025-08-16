import React from 'react';
import logo from '../../assets/kitsune-logo.png';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthProvider';



function Navbar() {
  const { logout } = useAuth();

  const handleLogOut = () => {
    logout();
    toast.success("Admin Logged Out Successfully...");
  };

  return (
    <nav className='flex z-50 flex-row sticky top-0 px-4 sm:px-7 py-2 justify-between items-center border-b-2 border-red-500 bg-gray-100 shadow-sm'>
      <img src={logo} className='size-14 mb-2 sm:mb-0' alt="Kitsune Logo" />
      <div className='flex justify-between items-center'>
        <Link to='/' onClick={handleLogOut}>
          <button className='px-4 py-2 text-lg font-semibold border-2 rounded-md border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300'>
            Log Out
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;