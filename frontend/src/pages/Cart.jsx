import React from 'react';
import { CircleMinus, CirclePlus, IndianRupee, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useShopContext } from '../context/ShopContext';
import CartTotal from '../components/CartTotal';
import toast from 'react-hot-toast';

const Cart = () => {
    const { 
        cartItems, 
        isAuthenticated,
        loading,
        clearCart,
        updateCartQuantity,
        removeFromCart
    } = useShopContext();
    const navigate = useNavigate();

    const handleUpdateQuantity = (item, operation) => {
        if (!isAuthenticated) {
            toast.error("Please log in to manage your cart.");
            return;
        }

        if (!item.productId.isVisible) {
            toast.error("This item is no longer available.");
            return;
        }
        
        let newQuantity;
        if (operation === 'increment') {
            newQuantity = Math.min(item.quantity + 1, 9);
        } else {
            newQuantity = Math.max(item.quantity - 1, 0);
        }

        if (newQuantity === 0) {
            removeFromCart(item.productId._id, item.size);
        } else {
            updateCartQuantity(item.productId._id, item.size, operation);
        }
    };
    
    const handleRemoveProduct = (item) => {
        removeFromCart(item.productId._id, item.size);
    }
    
    if (loading) {
        return <div className='text-center text-xl mt-10'>Loading cart...</div>;
    }

    if (!isAuthenticated) {
        return (
            <div className='flex flex-col items-center justify-center h-full p-8 text-center'>
                <h1 className='text-3xl font-bold text-red-600 mb-4'>Please Log In</h1>
                <p className='text-lg text-gray-700'>You need to be logged in to view your cart.</p>
            </div>
        );
    }
    
    return (
        <div className='p-4'>
            <section className='flex flex-col lg:flex-row gap-6 my-3'>
                {/* Cart Items Section */}
                <div className='w-full lg:w-2/3'>
                    <div className='flex justify-between items-center border-b-2 border-slate-400 pb-2 mb-4'>
                        <h1 className='text-2xl font-semibold'>Your Cart</h1>
                        {cartItems && cartItems.length > 0 && (
                            <button
                                onClick={clearCart}
                                className='text-sm cursor-pointer hover:text-red-800 text-red-600 underline font-semibold'
                            >
                                Clear Shopping Cart
                            </button>
                        )}
                    </div>
                    {cartItems && cartItems.length > 0 ? (
                        <div className='space-y-4'>
                            {cartItems.map((item) => (
                                <div key={item._id} className={`flex flex-row gap-4 items-center p-4 rounded-md shadow-sm border border-red-200 bg-white ${!item.productId.isVisible ? 'opacity-70 bg-red-100' : ''}`}>
                                    <Link to={`/collection/${item.productId._id}`} className='flex-shrink-0'>
                                        <img src={item.productId.productUrl} className='size-20 rounded-md object-cover' alt={item.productId.name} />
                                    </Link>
                                    <div className='flex-grow text-lg'>
                                        <h1 className='text-xl font-semibold text-red-700'>{item.productId.name}</h1>
                                        <p className='text-sm text-gray-600'>Category: {item.productId.category}</p>
                                        <p className='text-sm font-bold text-red-600'>Size: {item.size}</p>
                                        <div className='flex items-center gap-1 mt-1'>
                                            <IndianRupee size={16} className='text-red-600' />
                                            <h2 className='text-red-600 font-bold'>{item.productId.offerPrice}</h2>
                                        </div>
                                    </div>
                                    <div className='flex flex-row items-center gap-2 mt-2 sm:mt-0'>
                                        {item.productId.isVisible ? (
                                            <>
                                                <div className='inline-flex gap-2 items-center justify-between rounded-md shadow-sm border border-black p-1 text-red-600'>
                                                    <span className='select-none cursor-pointer' onClick={() => handleUpdateQuantity(item, 'decrement')}>
                                                        <CircleMinus size={20} />
                                                    </span>
                                                    <span className='select-none text-lg font-semibold w-6 text-center text-black'>
                                                        {item.quantity}
                                                    </span>
                                                    <span 
                                                        className={`select-none cursor-pointer ${item.quantity >= 9 ? 'text-gray-400' : ''}`} 
                                                        onClick={() => item.quantity < 9 ? handleUpdateQuantity(item, 'increment') : null}
                                                    >
                                                        <CirclePlus size={20} />
                                                    </span>
                                                </div>
                                                <button type='button' onClick={() => handleRemoveProduct(item)} className='text-red-600 font-semibold hover:text-red-900 underline flex items-center gap-1'>
                                                    <Trash2 size={16} />
                                                </button>
                                            </>
                                        ) : (
                                            <p className="text-sm font-bold text-red-600">Unavailable</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='w-full text-center py-10 bg-red-100 rounded-lg'>
                            <h1 className='text-2xl font-semibold border-b-2 border-slate-300 pb-1'>Cart is Empty</h1>
                            <h2 className='text-slate-700 mt-2'>Go to collections page and add some products</h2>
                            <Link to="/collection">
                                <button type="button" className='mt-4 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-semibold'>
                                    Go to Collection
                                </button>
                            </Link>
                        </div>
                    )}
                    {cartItems && cartItems.length > 0 && (
                        <div className='px-4 py-2 border-2 rounded-md my-4 border-slate-300 w-full lg:w-max '>
                            <h1 className='text-xl font-bold border-b-2 pb-1 mb-2'>Apply Coupon</h1>
                            <input type="text" className='border-b-2 focus:outline-none border-slate-600 max-w-[300px] mr-2 p-1' />
                            <button className='bg-red-600 py-1 px-3 rounded-md text-white text-lg font-semibold hover:bg-red-700'>
                                Apply
                            </button>
                        </div>
                    )}
                </div>

                {/* Cart Summary Section */}
                {cartItems && cartItems.length > 0 && (
                    <div className='w-full lg:w-1/3 p-4 border-2 rounded-md shadow-md bg-white self-start'>
                        <CartTotal />
                        <Link to={`/checkout`}>
                            <button type="button" className='w-full mt-4 p-2 rounded-md bg-red-600 text-lg hover:bg-red-800 font-semibold text-white'>
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Cart;