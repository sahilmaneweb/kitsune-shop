import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';
import OrderUI from '../OrderUI';


const AllOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/order/allOrder");
      if (response.data.success && response.data.data.length > 0) {
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

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
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
      {orders.length > 0 ? (
        <div className='space-y-4'>
          {orders.map((orderItem) => (
            <OrderUI
              key={orderItem._id}
              order={orderItem}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      ) : (
        <div className='w-full text-center py-20 bg-red-100 rounded-lg'>
          <p className='text-2xl font-bold text-red-600 mb-4'>No orders found for now.</p>
        </div>
      )}
    </div>
  );
};

export default AllOrder;