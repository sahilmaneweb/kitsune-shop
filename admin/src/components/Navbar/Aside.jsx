import React from 'react';
import { FaList } from 'react-icons/fa';
import { GiCardboardBoxClosed } from 'react-icons/gi';
import { IoBagAddSharp } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

const Aside = () => {
  const baseLinkCss = 'flex justify-center items-center gap-2 w-full text-center rounded-lg py-3 font-semibold transition-colors duration-200';
  const inactiveCss = 'bg-red-200 text-red-600 hover:bg-red-300';
  const activeCss = 'bg-red-600 text-white';

  return (
    <div className='w-20 md:w-2/12 px-2 py-4 flex flex-col justify-start items-center gap-4 h-svh border-r-2 border-red-200'>
      <NavLink
        to="/"
        className={({ isActive }) => `${baseLinkCss} ${isActive ? activeCss : inactiveCss}`}
      >
        <IoBagAddSharp size='1.3em' />
        <span className='hidden lg:block text-md'>Add Product</span>
      </NavLink>
      <NavLink
        to="/listproduct"
        className={({ isActive }) => `${baseLinkCss} ${isActive ? activeCss : inactiveCss}`}
      >
        <FaList size="1.1em" />
        <span className='hidden lg:block text-md'>All Products</span>
      </NavLink>
      <NavLink
        to="/allorders"
        className={({ isActive }) => `${baseLinkCss} ${isActive ? activeCss : inactiveCss}`}
      >
        <GiCardboardBoxClosed size="1.5em" />
        <span className='hidden lg:block text-md'>All Orders</span>
      </NavLink>
    </div>
  );
};

export default Aside;