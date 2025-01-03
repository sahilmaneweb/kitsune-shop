import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { IndianRupee } from 'lucide-react';


const CartTotal = () => {
    const {totalAmount, itemLength} = useContext(ShopContext);
  return (
    <div className='flex flex-col gap-2'>
        <h1 className='text-lg font-bold border-b-2 pb-1'>Cart Summary</h1>
        <div className='flex justify-between'>
            <h2>Items : </h2>
            <h2 className='font-bold flex items-center gap-1'> {itemLength}</h2>
        </div>
        <div className='flex justify-between'>
            <h2>Subtotal : </h2>
            <h2 className='font-bold flex items-center gap-1'><IndianRupee size={16} /> {totalAmount}</h2>
        </div>
        <div className='flex justify-between'>
            <h2>Shipping : </h2>
            <h2 className='font-bold flex items-center gap-1'><IndianRupee size={16} /> 20</h2>
        </div>
        <div className='flex justify-between'>
            <h2>Taxes : </h2>
            <h2 className='font-bold flex items-center gap-1'><IndianRupee size={16} /> 0</h2>
        </div>
        <div className='flex justify-between'>
            <h2>Coupan Discount : </h2>
            <h2 className='font-bold flex items-center gap-1'><IndianRupee size={16} /> 0</h2>
        </div>
        <div className='flex justify-between font-bold pt-2 border-t-2 border-slate-300'>
            <h2>Total : </h2>
            <h2 className='font-bold flex items-center gap-1'><IndianRupee size={16} /> {totalAmount}</h2>
        </div>
        
    </div>
  )
}

export default CartTotal