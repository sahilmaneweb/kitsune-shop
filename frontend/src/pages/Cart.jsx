import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { CircleMinus, CirclePlus, IndianRupee } from 'lucide-react';
import { Link } from 'react-router';
import CartTotal from '../components/cartTotal';
import toast from 'react-hot-toast';

const Cart = () => {

  const { cart, setCart ,productData, incrementProduct, removeProduct, clearCart } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    const tempData = [];

    for(const items in cart){
      for(const item in cart[items]){
        if(cart[items][item] > 0){
          tempData.push({
            id : items,
            size : item,
            quantity : cart[items][item]
          });
        }
      }
    }
    setCartData(tempData);
  }, [cart]);

  return (
    <div className='p-2'>

      <section className='flex flex-col lg:flex-row gap-3 justify-between items-center my-3 '>

        <div className='w-full lg:w-[75%]'>
          <div className='flex justify-between items-center border-b-2 border-slate-400 pb-2'>
            <h1 className='text-2xl font-semibold'>Your Cart</h1>
            {
              cartData.length > 0 && <button onClick={()=>clearCart()} className='text-[15px] cursor-pointer hover:text-red-800 text-red-600 underline font-semibold'>Clear Shopping Cart</button>
            }
          </div>

          <div>
            {
              cartData.length > 0 ? (
                <div>
            {
              cartData.map((item, index) => {
                const product = productData.find((product) => product.id === item.id );

                return (
                  <div key={index} className='grid grid-cols-[1fr_4fr_1.5fr] gap-4 py-2 border-b-2 border-slate-400'>
                    <div>
                      <Link to={`/collection/${item.id}`}>
                        <img src={product.image} className='w-full rounded-md' alt="" />
                      </Link>
                    </div>
                    <div className=' text-lg'>
                        <h1 className='text-2xl font-semibold mt-0'>{product.name}</h1>
                        <h1>Category : {product.category}</h1>
                        <div className='flex items-center gap-1 mt-3'> <IndianRupee size={16} /> <h2 className='mr-2'>{product.newPrice}</h2> | <span className='ml-3 grid place-items-center size-7 rounded-sm text-sm font-bold bg-red-200 border-2 border-red-600'>{item.size}</span> </div>
                        <button type='button' onClick={() => removeProduct(product.id, item.size)} className='text-red-600 font-semibold hover:text-red-900 underline '>Remove</button>
                    </div>
                    <div className='h-11 px-3 inline-flex gap-2 items-center justify-between rounded-md shadow-sm shadow-black/55'>
                      <span className='select-none cursor-pointer' onClick={()=> incrementProduct(item.id, item.size, 'decrement')}>
                        <CircleMinus />
                      </span>
                      <span className='select-none text-xl font-semibold'>
                        {item.quantity}
                      </span>
                      <span className='select-none cursor-pointer' onClick={()=> incrementProduct(item.id, item.size, 'increment')}>
                        <CirclePlus />
                      </span>
                    </div>
                  </div>
                )
              })
            }
          </div>
              ) : (
                <div className='flex my-3 flex-col gap-2 items-center'>
                  <h1 className='text-xl fonr-semibold border-b-2 border-slate-300 pb-1'>Cart is Empty</h1>
                  <h2 className='text-slate-700'>Go to collections page and add some products</h2>
                  <Link to="/collection">
                  <button type="button" className='cursor-pointer text-red-600 underline text-[15px] '>Go to Collection</button>
                  </Link>

                </div>
              )
            }
          </div>

          {
            cartData.length > 0 && (
              <div className='px-4 py-2 border-2 rounded-md my-2 border-slate-300 w-max '>
            <h1 className='text-xl font-semibold block '>Apply Coupan</h1>
            <input type="text"  className='border-b-2 focus:outline-none border-slate-600 max-w-[300px] mr-2' />
            <button className='bg-red-600 py-1 rounded-md ml-2 text-white px-3 text-lg font-semibold '>Apply</button>
            </div>
            )
          }
        </div>

        <div className={`${cartData.length > 0 ? "w-full lg:w-[25%] border-2 rounded-md shadow-md py-2 px-3" : ""}`}>
          {
            cartData.length > 0 && (
              <div>
                <CartTotal/>
            <Link to={`/checkout`}>
            <button type="button" className='w-full mt-2 rounded-sm bg-red-600 text-lg hover:bg-red-800 font-semibold text-white'>
            Proceed Checkout
            </button>
              </Link>
              </div>
            )
          }
        </div>

      </section>
      
    </div>
  )
}

export default Cart