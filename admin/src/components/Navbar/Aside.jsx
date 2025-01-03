import React from 'react'
import { FaList } from 'react-icons/fa';
import { GiCardboardBoxClosed } from 'react-icons/gi';
import { IoBagAddSharp } from 'react-icons/io5';
import { NavLink } from 'react-router-dom'

const Aside = () => {
  const navLinkCss = "flex justify-center items-center gap-2 bg-red-200 w-full text-md text-center rounded-lg py-3 font-semibold";
  const active = "bg-red-600 px-1 text-white";
  return (
    <div className=' w-20 md:w-2/12  px-2 py-2 flex flex-col justify-start items-center gap-2 h-svh border-r-2 border-red-200'>
      <NavLink to="/" className={({isActive})=>`${navLinkCss} ${isActive ? active : " "}`}> <IoBagAddSharp size='1.3em' /> <span className='hidden lg:block'>Add Product</span> </NavLink>
      <NavLink to="/listproduct" className={({isActive})=>`${navLinkCss} ${isActive ? active : " "}`}> <FaList size="1.1em" /> <span className='hidden lg:block'>All Product</span> </NavLink>
      <NavLink to="/allorders" className={({isActive})=>`${navLinkCss} ${isActive ? active : " "}`}> <GiCardboardBoxClosed size="1.5em" /> <span className='hidden lg:block'>All Orders</span> </NavLink>

    </div>
  )
}

export default Aside