import React from 'react';
import { useShopContext } from '../context/ShopContext';
import { IndianRupee } from 'lucide-react';

const CartTotal = () => {
    const { totalAmount, itemLength } = useShopContext();
    const shippingCost = 20;
    const taxes = 0;
    const couponDiscount = 0;
    const finalTotal = totalAmount + shippingCost + taxes - couponDiscount;

    return (
        <div className='flex flex-col gap-3'>
            <h1 className='text-lg font-bold border-b-2 pb-1'>Cart Summary</h1>
            <div className='flex justify-between'>
                <h2 className='text-lg'>Items:</h2>
                <h2 className='font-bold text-lg'>{itemLength}</h2>
            </div>
            <div className='flex justify-between'>
                <h2 className='text-lg'>Subtotal:</h2>
                <h2 className='font-bold flex items-center gap-1 text-lg'>
                    <IndianRupee size={16} />
                    {totalAmount.toFixed(2)}
                </h2>
            </div>
            <div className='flex justify-between'>
                <h2 className='text-lg'>Shipping:</h2>
                <h2 className='font-bold flex items-center gap-1 text-lg'>
                    <IndianRupee size={16} />
                    {shippingCost.toFixed(2)}
                </h2>
            </div>
            <div className='flex justify-between'>
                <h2 className='text-lg'>Taxes:</h2>
                <h2 className='font-bold flex items-center gap-1 text-lg'>
                    <IndianRupee size={16} />
                    {taxes.toFixed(2)}
                </h2>
            </div>
            <div className='flex justify-between'>
                <h2 className='text-lg'>Coupon Discount:</h2>
                <h2 className='font-bold flex items-center gap-1 text-lg'>
                    <IndianRupee size={16} />
                    {couponDiscount.toFixed(2)}
                </h2>
            </div>
            <div className='flex justify-between font-bold pt-2 border-t-2 border-slate-300'>
                <h2 className='text-lg'>Total:</h2>
                <h2 className='font-bold flex items-center gap-1 text-lg'>
                    <IndianRupee size={16} />
                    {finalTotal.toFixed(2)}
                </h2>
            </div>
        </div>
    );
};

export default CartTotal;