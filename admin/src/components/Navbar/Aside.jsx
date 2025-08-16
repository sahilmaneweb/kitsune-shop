import React from 'react';
import { FaList } from 'react-icons/fa';
import { GiCardboardBoxClosed } from 'react-icons/gi';
import { IoBagAddSharp, IoSpeedometerSharp } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

function Aside() {
  const baseLinkCss = 'flex justify-center items-center gap-2 w-full text-center rounded-lg py-3 font-semibold transition-colors duration-200';
  const inactiveCss = 'bg-red-200 text-red-600 hover:bg-red-300';
  const activeCss = 'bg-red-600 text-white';

  return (
    <div className='w-20 md:w-2/12 px-2 py-4 flex flex-col justify-start items-center gap-4 min-h-screen sticky top-0 border-r-2 border-red-200'>
      <NavLink
        to="/dashboard"
        end // Use the 'end' prop to match the exact path
        className={({ isActive }) => `${baseLinkCss} ${isActive ? activeCss : inactiveCss}`}
      >
        <IoSpeedometerSharp size='1.3em' />
        <span className='hidden lg:block text-md'>Dashboard</span>
      </NavLink>
      <NavLink
        to="/dashboard/addproduct"
        className={({ isActive }) => `${baseLinkCss} ${isActive ? activeCss : inactiveCss}`}
      >
        <IoBagAddSharp size='1.3em' />
        <span className='hidden lg:block text-md'>Add Product</span>
      </NavLink>
      <NavLink
        to="/dashboard/listproduct"
        className={({ isActive }) => `${baseLinkCss} ${isActive ? activeCss : inactiveCss}`}
      >
        <FaList size="1.1em" />
        <span className='hidden lg:block text-md'>All Products</span>
      </NavLink>
      <NavLink
        to="/dashboard/allorders"
        className={({ isActive }) => `${baseLinkCss} ${isActive ? activeCss : inactiveCss}`}
      >
        <GiCardboardBoxClosed size="1.5em" />
        <span className='hidden lg:block text-md'>All Orders</span>
      </NavLink>
    </div>
  );
};

export default Aside;