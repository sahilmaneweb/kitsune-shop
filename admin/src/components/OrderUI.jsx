import React, { useState } from 'react';
import { IoChevronDown, IoChevronUp, IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5';
import api from '../services/api';
import toast from 'react-hot-toast';

const OrderUI = ({ order, onUpdateStatus }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleUpdateStatus = async (action) => {
    setIsUpdating(true);
    try {
      // The endpoint now directly reflects the action (confirm or cancel)
      const endpoint = `/order/updateOrderStatus/${order._id}/${action}`;
      await api.patch(endpoint);
      onUpdateStatus(order._id, action === 'confirm' ? 'confirmed' : 'cancelled');
      toast.success(`Order status changed to ${action === 'confirm' ? 'confirmed' : 'cancelled'}.`);
    } catch (error) {
      toast.error(`Failed to ${action} order.`);
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className='border rounded-lg border-red-200 p-4 bg-red-50 shadow-sm transition-all duration-300 hover:shadow-md'>

      {/* Header Section: Order ID, Status, and Toggle */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-red-200'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2'>
          <h1 className='text-lg font-semibold text-red-800 break-words w-full sm:w-auto'>Order ID: {order._id}</h1>
          {getStatusBadge(order.status)}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className='flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors duration-200 mt-2 sm:mt-0'
        >
          {isExpanded ? 'Hide Details' : 'Show Details'}
          {isExpanded ? <IoChevronUp size="1.5em" /> : <IoChevronDown size="1.5em" />}
        </button>
      </div>

      {/* User and Order Details Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
        <div className='flex flex-col'>
          <h3 className='font-bold text-red-600 text-lg'>Customer Info</h3>
          <p className='text-sm text-gray-600'>{order.userName}</p>
          <p className='text-sm text-gray-600'>{order.userEmail}</p>
          <p className='text-sm text-gray-600'>Contact: {order.userContact}</p>
          <p className='text-sm text-gray-600'>Address: {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipcode}</p>
        </div>
        
        <div className='flex flex-col'>
          <h3 className='font-bold text-red-600 text-lg'>Order Details</h3>
          <p className='text-sm text-gray-600'>Items Count: {order.items.length}</p>
          <p className='text-sm text-gray-600'>Total Amount: <span className='font-bold text-red-700'>₹ {order.amount.toFixed(2)}</span></p>
          <p className='text-sm text-gray-600'>Date: {new Date(order.date).toLocaleDateString()}</p>
        </div>

        {/* Actions Button Section (Visible only when pending) */}
        {order.status === 'pending' && (
          <div className='flex flex-col items-start gap-2 mt-4 md:mt-0 lg:ml-auto lg:items-end'>
            <div className='flex items-center gap-2'>
              <button
                onClick={() => handleUpdateStatus('confirm')}
                disabled={isUpdating}
                className={`bg-green-500 text-white p-3 rounded-lg text-sm flex items-center gap-1 hover:bg-green-600 transition-colors duration-200 ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <IoCheckmarkCircleOutline size="1.2em" /> Confirm
              </button>
              <button
                onClick={() => handleUpdateStatus('cancel')}
                disabled={isUpdating}
                className={`bg-red-500 text-white p-3 rounded-lg text-sm flex items-center gap-1 hover:bg-red-600 transition-colors duration-200 ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <IoCloseCircleOutline size="1.2em" /> Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Collapsible Items Table */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <div className='p-4 bg-white rounded-lg border border-red-100'>
          <h3 className='font-bold text-red-600 mb-2'>Ordered Items</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {order.items.map((item, index) => (
              <div key={index} className='flex items-center gap-4 p-3 border border-red-200 rounded-md shadow-sm'>
                <img src={item.imageUrl} alt={item.name} className='size-16 rounded-md object-cover flex-shrink-0' />
                <div className='flex flex-col'>
                  <p className='font-semibold text-base text-red-700'>{item.name}</p>
                  <p className='text-sm text-gray-600 mt-1'>Size: <span className='font-medium'>{item.size}</span> | Qty: <span className='font-medium'>{item.quantity}</span></p>
                  <p className='text-sm text-gray-600'>Price: <span className='font-medium'>₹{item.price}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderUI;