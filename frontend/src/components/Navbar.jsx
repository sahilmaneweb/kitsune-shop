import React, { useContext, useState } from 'react'
import logo from '../assets/kitsune-logo.png'
import { Link, NavLink, useNavigate } from 'react-router'
import { ChevronLeft, CircleUserRound, Menu, ShoppingCart } from 'lucide-react'
import { ShopContext } from '../context/ShopContext'
import toast from 'react-hot-toast'

const Navbar = () => {
  const navigate = useNavigate();
  const {token, setToken} = useContext(ShopContext);
  const [mobile, setMobile] = useState(false);

  const handleLogin = () => {
    if(!token){
      navigate('/login');
    }
  }

  return (
    <div className='flex justify-between items-center py-2 px-2'>
      <div>
        <img src={logo} className='size-14 lg:size-16' alt="logo" />
      </div>
      <div className='hidden sm:flex gap-6 text-[20px] font-semibold'>
        <div>
          <NavLink to="/">
          <p>Home</p>
          <hr className='block w-full h-1 border-none rounded bg-transparent'/>
        </NavLink>
        </div>
        <div>
          <NavLink to="/about">
          <p>About</p>
          <hr className='block w-full h-1 border-none rounded bg-transparent'/>
        </NavLink>
        </div>
        <div>
          <NavLink to="/collection">
          <p>Collection</p>
          <hr className='block w-full h-1 border-none rounded bg-transparent'/>
        </NavLink>
        </div>
      </div>
      <div className='flex gap-6'>
        <div className='relative group cursor-pointer'>
         <button onClick={handleLogin}><CircleUserRound size={39} /></button>
         {
          token ? (
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-1'>
            <div className='flex flex-col gap-2 rounded-md shadow-md w-36 py-3 px-5 bg-slate-100 text-gray-600'>
              <Link to={`/myorder`} ><p className='cursor-pointer hover:text-black'>Orders</p></Link>
              <p onClick={()=>setToken(false)} className='cursor-pointer text-red-600 border-t-2 border-slate-300 hover:text-black'>Log out</p>
            </div>
          </div>
          ) : (<div></div>)
         }
        </div>
        <div className='cursor-pointer'>
         <NavLink to="/cart">
          <ShoppingCart size={39} />
         </NavLink>
        </div>
        <div onClick={()=> setMobile(true)} className='cursor-pointer sm:hidden'>
         <Menu size={39} />
        </div>
      </div>

      {
        mobile && <div className='sm:hidden p-3 z-20 fixed top-0 left-0 w-full h-screen bg-white divide-y-2 divide-slate-400 '>
        <div onClick={() => setMobile(false)} className='flex py-2 cursor-pointer items-center text-[20px]'>
          <ChevronLeft size={30} /> Back
        </div>
        <div onClick={() => setMobile(false)} className='pl-5 py-2 text-[20px]'>
          <NavLink to="/">
          <p>Home</p>
        </NavLink>
        </div>
        <div onClick={() => setMobile(false)} className='pl-5 py-2 text-[20px]'>
          <NavLink to="/about">
          <p>About</p>
        </NavLink>
        </div>
        <div onClick={() => setMobile(false)} className='pl-5 py-2 text-[20px]'>
          <NavLink to="/collection">
          <p>Collection</p>
        </NavLink>
        </div>
      </div>
      }
    </div>
  )
}

export default Navbar