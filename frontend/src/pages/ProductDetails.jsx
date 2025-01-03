import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { CircleMinus, CirclePlus, IndianRupee, ShoppingBag } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import toast from 'react-hot-toast';
const ProductDetails = () => {

  const { addProduct} = useContext(ShopContext);
  const sizes = ['S', 'M', 'L', 'XL'];

  const { productData} = useContext(ShopContext);

  const {id} = useParams();
  const [product, setProduct ] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('S');

  useEffect(()=>{
    setQuantity(1);
    const product1 = productData.map((item)=>{
      if(item.id === id ) {
        setProduct(item);
      }
    });
  },[]);

  const handleAdd = () =>{
    addProduct(product.id, size, quantity);
    setQuantity(1);
    setSize('S');
  }

  return (
    <div className='p-1'>

      <section className='grid sm:w-full w-11/12 mx-auto grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2 my-3'>

        <div className='h-full flex flex-col gap-3 md:flex-row-reverse'>

          <div>
            <img src={product.image} alt="" className='w-full md:w-[80%] md:max-h-[550px] rounded-lg block' />
          </div>

          <div className='flex flex-row md:flex-col gap-3'>
              <img src={product.image} className='w-[22%] md:w-[100px] rounded-md md:h-[100px] flex-shrink-0 cursor-pointer' alt="" />
              <img src={product.image} className='w-[22%] md:w-full rounded-md md:h-[100px] flex-shrink-0 cursor-pointer' alt="" />
              <img src={product.image} className='w-[22%] md:w-full rounded-md md:h-[100px] flex-shrink-0 cursor-pointer' alt="" />
              <img src={product.image} className='w-[22%] md:w-full rounded-md md:h-[100px] flex-shrink-0 cursor-pointer' alt="" />
          </div>
        </div>


        <div>

          <h2 className='text-xl font-semibold text-red-600'>{product.category}</h2>

          <h1 className='text-3xl font-semibold mb-5'>{product.name}</h1>
          <h2>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla eaque cum molestias iusto nemo unde aliquid, enim quod corporis nihil, facilis officiis quaerat eum neque sint voluptate, adipisci excepturi a?</h2>
          <div className='my-1 flex items-center gap-3'>
            <h1 className='flex items-center gap-1 text-2xl'><IndianRupee /> {product.newPrice}</h1>
            <h1 className='flex items-center gap-1 text-2xl line-through text-red-700'><IndianRupee /> {product.oldPrice}</h1>
          </div>

          <div className='flex my-3 text-xl text-red-700 font-bold p-1 gap-3'>
            {
              sizes.map((item, index) => {
                if(item === size){
                  return <h1 key={item} onClick={() => setSize(item)} className='grid rounded-md place-items-center size-10 bg-red-300 ring-2 ring-red-500 cursor-pointer'>{item}</h1>
                }else{
                  return <h1 key={item} onClick={() => setSize(item)} className='grid rounded-md place-items-center size-10 bg-red-100 bordeer-2 border-red-500 cursor-pointer'>{item}</h1>
                }
              })
            }
          </div>
            <div className='flex'>
          <div className='border-2 flex items-center gap-4 p-2 text-2xl font-semibold rounded-md border-black'>
            <span onClick={()=>{
              quantity > 1 ? setQuantity(quantity - 1) : "" 
            }} className='select-none cursor-pointer'>
              <CircleMinus size={30} />
            </span>
            <span className='grid place-items-center size-8 select-none'>
              {
                quantity
              }
            </span>
            <span onClick={()=>{
              quantity < 9 ? setQuantity(quantity + 1) : "" 
            }} className='select-none cursor-pointer'>
              <CirclePlus size={30} />
            </span>
          </div>
            <button type="button" onClick={handleAdd} className='bg-red-700 grow ml-4 text-white px-3 py-2 rounded-lg ring-2 ring-red-300 text-xl font-semibold flex justify-center items-center gap-2'>
              <ShoppingBag />
              <p>Add to Cart</p>
            </button>
            </div>
        </div>

      </section>
      
    </div>
  )
}

export default ProductDetails