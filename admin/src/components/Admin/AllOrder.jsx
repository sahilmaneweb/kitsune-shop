import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import OrderUI from '../OrderUI';
import api from '../../services/api';
import { IoRefresh } from 'react-icons/io5';

function AllOrder() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/order/allOrders");
      if (response.data.success && response.data.data) {
        setOrders(response.data.data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      toast.error("Failed to fetch orders.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === filter));
    }
  }, [filter, orders]);

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleRefresh = () => {
    setFilter('all');
    fetchOrders();
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-full text-2xl text-red-600'>
        Loading orders...
      </div>
    );
  }

  return (
    <div className='p-2'>
      <h1 className='block pl-2 text-2xl py-2 border-b-2 border-red-400 mb-3 font-semibold'>All Orders</h1>
      
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 px-2 gap-4 sm:gap-0'>
        <div className='flex items-center gap-2'>
          <label htmlFor='statusFilter' className='font-semibold text-red-600'>Filter:</label>
          <select
            id='statusFilter'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='border-2 py-1 px-2 border-red-300 rounded-md focus:outline-none focus:border-red-600'
          >
            <option value='all'>All</option>
            <option value='pending'>Pending</option>
            <option value='confirmed'>Confirmed</option>
            <option value='cancelled'>Cancelled</option>
          </select>
        </div>
        <button
          onClick={handleRefresh}
          className='px-4 py-2 text-md font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300 flex items-center gap-2'
        >
          <IoRefresh />
          <span className="hidden sm:block">Refresh</span>
        </button>
      </div>

      {filteredOrders.length > 0 ? (
        <div className='space-y-4'>
          {filteredOrders.map((orderItem) => (
            <OrderUI
              key={orderItem._id}
              order={orderItem}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      ) : (
        <div className='w-full text-center py-20 bg-red-100 rounded-lg'>
          <p className='text-2xl font-bold text-red-600 mb-4'>No orders found.</p>
        </div>
      )}
    </div>
  );
}

export default AllOrder;