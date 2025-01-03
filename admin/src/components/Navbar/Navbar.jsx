import React, { useState } from 'react'
import logo from '../../assets/kitsune-logo.png'

import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <div>
    <nav className='flex sticky top-0 flex-wrap px-7 py-2 justify-between items-center border-b-2 border-red-500'>
        <img src={logo} className='size-14'  />
        
        <div className='flex justify-between items-center  flex-wrap content-between'>
          {/* <Link>
            <button className={`px-2 text-lg hover:text-red-500   font-semibold inline-block md:hidden`}>Add Product</button>
          </Link>
          <Link>
            <button className={`px-2 text-lg hover:text-red-500  font-semibold inline-block md:hidden`}>All Product</button>
          </Link>
          <Link>
            <button className={`px-2 text-lg hover:text-red-500  font-semibold inline-block md:hidden`}>All Order</button>
          </Link> */}
          <Link>
            <button className={`px-2 text-lg hover:text-red-500 flex-grow-1 font-semibold inline-block border-2 rounded-md md:px-5 ml-2 border-black hover:border-red-400`}>Log Out</button>
          </Link>
        </div>
    </nav>
    </div>
  )
}

export default Navbar