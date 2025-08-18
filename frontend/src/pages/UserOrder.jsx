import React, { useEffect, useState } from 'react';
import { IndianRupee, ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useShopContext } from '../context/ShopContext';
import toast from 'react-hot-toast';
import api from '../services/api';

const UserOrder = () => {
    const { userOrders, loading, isAuthenticated, loadUserOrders } = useShopContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            loadUserOrders();
        }
    }, [isAuthenticated, loadUserOrders]);

    if (loading) {
        return <div className='text-center text-xl mt-10'>Loading your orders...</div>;
    }

    if (!isAuthenticated) {
        return (
            <div className='flex flex-col items-center justify-center h-full p-8 text-center'>
                <h1 className='text-3xl font-bold text-red-600 mb-4'>Please Log In</h1>
                <p className='text-lg text-gray-700'>You need to be logged in to view your orders.</p>
            </div>
        );
    }
    
    if (!userOrders || userOrders.length === 0) {
        return (
            <div className='w-full text-center py-20 bg-red-100 rounded-lg'>
                <p className='text-2xl font-bold text-red-600 mb-4'>You have not placed any orders yet.</p>
                <Link to="/collection">
                    <button type="button" className='mt-4 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 transition-colors'>
                        Go to Collections
                    </button>
                </Link>
            </div>
        );
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <span className="bg-yellow-400 text-yellow-900 font-semibold px-3 py-1 rounded-full text-sm">Pending</span>;
            case 'confirmed':
                return <span className="bg-green-400 text-green-900 font-semibold px-3 py-1 rounded-full text-sm">Confirmed</span>;
            case 'cancelled':
                return <span className="bg-red-400 text-red-900 font-semibold px-3 py-1 rounded-full text-sm">Cancelled</span>;
            default:
                return <span className="bg-gray-400 text-gray-900 font-semibold px-3 py-1 rounded-full text-sm">Unknown</span>;
        }
    };

    
    return (
        <div className='py-2 px-5'>
            <h1 className='font-semibold text-2xl border-b-4 pb-1 mb-4'>My Orders</h1>
            <section className='space-y-4'>
                {userOrders.map((order) => (
                    <div key={order._id} className='p-4 border-2 rounded-lg shadow-md bg-white border-red-200'>
                        {/* Order Header */}
                        <div className='flex justify-between items-center mb-4 pb-2 border-b-2 border-red-200'>
                            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2'>
                                <h1 className='text-lg font-semibold'>Order ID: {order._id}</h1>
                                {getStatusBadge(order.status)}
                            </div>
                            <h2 className='text-md text-gray-600'>Date: {new Date(order.date).toLocaleDateString('en-GB')}</h2>
                        </div>
                        
                        {/* Order Details */}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                            <div>
                                <h3 className='text-lg font-semibold text-red-600'>Shipping Info</h3>
                                <p className='text-sm text-gray-600'>{order.userName}</p>
                                <p className='text-sm text-gray-600'>{order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                            </div>
                            <div>
                                <h3 className='text-lg font-semibold text-red-600'>Payment</h3>
                                <p className='text-sm text-gray-600'>Method: Cash on Delivery</p>
                                <p className='text-sm text-gray-600'>Total: <span className='font-bold text-red-700'>₹{order.amount}</span></p>
                            </div>
                            <div className='md:col-span-2'>
                                <h3 className='text-lg font-semibold text-red-600'>Items ({order.items.length})</h3>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2'>
                                    {order.items.map((item) => (
                                        <div key={item.productId} className='flex items-center gap-2 p-2 border border-red-100 rounded-md bg-white'>
                                            <img src={item.imageUrl} alt={item.name} className='size-12 rounded-md object-cover' />
                                            <div className='text-sm'>
                                                <p className='font-medium text-red-700'>{item.name}</p>
                                                <p className='text-xs text-gray-600'>Qty: {item.quantity} | Size: {item.size}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {/* View Invoice Button (only for confirmed orders) */}
                        
                    </div>
                ))}
            </section>
        </div>
    );
};

export default UserOrder;