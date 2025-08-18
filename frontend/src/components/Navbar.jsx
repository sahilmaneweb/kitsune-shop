import React, { useState } from 'react';
import logo from '../assets/kitsune-logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom'; // Corrected import for useNavigate
import { ChevronLeft, CircleUserRound, Menu, ShoppingCart } from 'lucide-react';
import { useShopContext } from '../context/ShopContext'; // Use the custom hook
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, itemLength, loading } = useShopContext(); // Get state and logout from context
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Renamed for clarity

  const handleUserIconClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout(); // Call logout from context
    
  };

  return (
    <nav className='flex sticky top-0 z-10 flex-wrap px-4 sm:px-7 py-2 justify-between items-center border-b-2 border-red-500 bg-white shadow-sm'>
      {/* Logo Section */}
      <div>
        <Link to="/">
          <img src={logo} className='size-14 lg:size-16' alt="Kitsune Logo" />
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className='hidden sm:flex gap-6 text-[18px] font-semibold text-gray-700'>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-red-600 transition-colors duration-200 ${isActive ? 'text-red-600 border-b-2 border-red-600' : ''}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `hover:text-red-600 transition-colors duration-200 ${isActive ? 'text-red-600 border-b-2 border-red-600' : ''}`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/collection"
          className={({ isActive }) =>
            `hover:text-red-600 transition-colors duration-200 ${isActive ? 'text-red-600 border-b-2 border-red-600' : ''}`
          }
        >
          Collection
        </NavLink>
      </div>

      {/* Right-side Icons (User, Cart, Mobile Menu Toggle) */}
      <div className='flex items-center gap-4 sm:gap-6'>
        {/* User Icon and Dropdown */}
        <div className='relative group cursor-pointer'>
          <button onClick={handleUserIconClick}>
            <CircleUserRound size={32} className='text-gray-700 hover:text-red-600 transition-colors duration-200' />
          </button>
          {isAuthenticated ? (
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-2'>
              <div className='flex flex-col gap-2 rounded-md shadow-lg w-36 py-3 px-4 bg-white text-gray-700 border border-gray-200'>
                <Link to={`/myorder`} onClick={() => setMobileMenuOpen(false)}>
                  <p className='cursor-pointer hover:text-red-600 transition-colors duration-200'>Orders</p>
                </Link>
                <p onClick={handleLogout} className='cursor-pointer text-red-600 border-t border-gray-200 pt-2 mt-2 hover:text-red-800 transition-colors duration-200'>
                  Log out
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Shopping Cart Icon */}
        <div className='relative cursor-pointer'>
          <NavLink to="/cart">
            <ShoppingCart size={32} className='text-gray-700 hover:text-red-600 transition-colors duration-200' />
            {itemLength > 0 && !loading && ( // Show count only if items exist and not loading
              <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                {itemLength}
              </span>
            )}
          </NavLink>
        </div>

        {/* Mobile Menu Toggle Icon */}
        <div onClick={() => setMobileMenuOpen(true)} className='cursor-pointer sm:hidden'>
          <Menu size={32} className='text-gray-700 hover:text-red-600 transition-colors duration-200' />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className='fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out sm:hidden'>
          <div className='flex justify-between items-center px-4 py-4 border-b border-gray-200'>
            <img src={logo} className='size-14' alt="Kitsune Logo" />
            <button onClick={() => setMobileMenuOpen(false)} className='text-gray-700 hover:text-red-600'>
              <ChevronLeft size={32} />
            </button>
          </div>
          <div className='flex flex-col gap-4 p-4 text-lg font-semibold text-gray-700'>
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `py-2 border-b border-gray-100 hover:text-red-600 transition-colors duration-200 ${isActive ? 'text-red-600' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `py-2 border-b border-gray-100 hover:text-red-600 transition-colors duration-200 ${isActive ? 'text-red-600' : ''}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/collection"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `py-2 border-b border-gray-100 hover:text-red-600 transition-colors duration-200 ${isActive ? 'text-red-600' : ''}`
              }
            >
              Collection
            </NavLink>
            {isAuthenticated ? (
              <>
                <Link to={`/myorder`} onClick={() => setMobileMenuOpen(false)} className='py-2 border-b border-gray-100 hover:text-red-600 transition-colors duration-200'>
                  Orders
                </Link>
                <p onClick={handleLogout} className='py-2 text-red-600 hover:text-red-800 transition-colors duration-200'>
                  Log out
                </p>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className='py-2 text-red-600 hover:text-red-800 transition-colors duration-200'>
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;