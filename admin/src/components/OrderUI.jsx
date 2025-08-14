import React, { useState } from 'react';
import { IoChevronDown, IoChevronUp, IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5';

import { toast } from 'react-hot-toast';
import api from '../services/api';

const OrderUI = ({ order, onUpdateStatus }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="bg-yellow-400 text-yellow-900 font-semibold px-2 py-1 rounded-full text-xs">Pending</span>;
      case 'confirmed':
        return <span className="bg-green-400 text-green-900 font-semibold px-2 py-1 rounded-full text-xs">Confirmed</span>;
      case 'cancelled':
        return <span className="bg-red-400 text-red-900 font-semibold px-2 py-1 rounded-full text-xs">Cancelled</span>;
      default:
        return <span className="bg-gray-400 text-gray-900 font-semibold px-2 py-1 rounded-full text-xs">Unknown</span>;
    }
  };

  const handleConfirm = async () => {
    setIsUpdating(true);
    try {
      await api.patch(`/order/updateOrderStatus/${order._id}/confirm`);
      onUpdateStatus(order._id, 'confirmed');
      toast.success("Order confirmed successfully.");
    } catch (error) {
      toast.error("Failed to confirm order.");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = async () => {
    setIsUpdating(true);
    try {
      await api.patch(`/order/updateOrderStatus/${order._id}/cancel`);
      onUpdateStatus(order._id, 'cancelled');
      toast.success("Order cancelled successfully.");
    } catch (error) {
      toast.error("Failed to cancel order.");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className='border rounded-lg border-red-200 p-4 bg-red-50 shadow-sm'>
      <div className='flex justify-between items-center cursor-pointer' onClick={() => setIsCollapsed(!isCollapsed)}>
        <div className='flex items-center gap-4'>
          {getStatusBadge(order.status)}
          <h1 className='text-lg font-semibold text-red-800'>Order ID: {order._id.substring(0, 8)}...</h1>
        </div>
        <div className='text-red-500'>
          {isCollapsed ? <IoChevronDown size="1.5em" /> : <IoChevronUp size="1.5em" />}
        </div>
      </div>

      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'max-h-0' : 'max-h-96'}`}>
        <div className='mt-4 pt-4 border-t border-red-200 grid gap-3 grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr]'>
          <div className='flex flex-col'>
            <h3 className='font-bold text-red-600'>Customer Info</h3>
            <p className='text-sm'>{order.userName}</p>
            <p className='text-sm'>{order.userEmail}</p>
            <p className='text-sm'>Contact: {order.userContact}</p>
            <p className='text-sm'>Address: {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipcode}</p>
          </div>

          <div className='flex flex-col'>
            <h3 className='font-bold text-red-600'>Order Details</h3>
            <p className='text-sm'>Items: {order.items.length}</p>
            <p className='text-sm'>Total Amount: <span className='font-bold text-red-700'>${order.amount}</span></p>
            <p className='text-sm'>Date: {new Date(order.date).toLocaleDateString()}</p>
          </div>

          <div>
            <h3 className='font-bold text-red-600'>Items</h3>
            <div className='bg-red-100 p-2 rounded-md'>
              {order.items.map((item, index) => (
                <div key={index} className='flex gap-2 items-center text-sm mb-1'>
                  <img src={item.productUrl} alt={item.name} className='size-10 rounded-sm object-cover' />
                  <p>{item.quantity} x {item.name} ({item.size})</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className='flex flex-col justify-end items-end'>
            {order.status === 'pending' ? (
              <div className='flex gap-2'>
                <button
                  onClick={handleConfirm}
                  disabled={isUpdating}
                  className={`bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition-colors duration-200 ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <IoCheckmarkCircleOutline size="1.5em" />
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isUpdating}
                  className={`bg-red-500 text-white p-3 rounded-xl hover:bg-red-600 transition-colors duration-200 ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <IoCloseCircleOutline size="1.5em" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderUI;