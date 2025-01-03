import React from 'react'
import { IndianRupee, MoveRight, ShoppingBag } from 'lucide-react'
import { Link, NavLink } from 'react-router'

const ProductCard = ({id, name, image, oldPrice, newPrice, category}) => {
  return (
    <div className='flex flex-col'>
      <Link to={`/collection/${id}`}>
      <div>
                      <img src={image} alt="" className='rounded-md' />
                    </div>
                    <h1 className='text-xl mt-2 font-semibold'>
                      {name}
                    </h1>
                    <div className='flex items-center gap-2 text-xl font-semibold'>
                      <h2 className='flex items-center'>
                        <IndianRupee size={20} />
                        {newPrice}</h2>
                      <h2 className='text-red-500 line-through flex items-center'>
                        <IndianRupee size={20} />
                        {oldPrice}</h2>
                    </div>
      </Link>
                    {/* <button className='flex items-center justify-center mt-2 gap-3 text-white bg-red-600 hover:bg-red-800 rounded-md p-2 text-lg font-semibold'>
                      <ShoppingBag />
                      <p>Add to Cart</p>
                    </button> */}
      </div>
  )
}

export default ProductCard