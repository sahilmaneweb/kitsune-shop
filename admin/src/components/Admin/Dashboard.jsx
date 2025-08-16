// src/components/Admin/Dashboard.jsx

import React, { useEffect, useState } from 'react';

import { IoCube, IoLayers, IoShieldCheckmark, IoCloseCircle, IoHourglass, IoCash, IoShirtOutline, IoBag } from 'react-icons/io5';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { FaHatCowboy } from 'react-icons/fa';
import { RiShirtFill, RiShirtLine } from 'react-icons/ri';
import { CgCap } from 'react-icons/cg';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('user/admin/dashboardStats');
        if (response.data.success) {
          setStats(response.data.data);
        } else {
          toast.error('Failed to load dashboard data.');
        }
      } catch (error) {
        console.error('API call failed:', error);
        toast.error('Failed to fetch dashboard statistics.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-full text-2xl text-red-600'>
        Loading dashboard...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className='flex justify-center items-center h-full text-2xl text-red-600'>
        No data available.
      </div>
    );
  }

  return (
    <div className='p-4'>
      <h1 className='block pl-2 text-3xl py-2 border-b-2 border-red-400 mb-6 font-bold text-red-600'>Admin Dashboard</h1>
      
      {/* Revenue Card - Prominent Position */}
      <div className='grid grid-cols-1 mb-8'>
        <div className='bg-green-600 text-white p-6 rounded-lg shadow-lg flex items-center gap-6'>
          <IoCash size='3em' />
          <div>
            <h2 className='text-3xl font-bold'>₹ {stats.orders.revenue.toFixed(2)}</h2>
            <p className='text-lg font-semibold'>Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Product & Order Statistics */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <div className='bg-red-500 text-white p-6 rounded-lg shadow-md flex items-center gap-4'>
          <IoBag size='2.5em' />
          <div>
            <h2 className='text-xl font-bold'>{stats.products.total}</h2>
            <p className='text-sm'>Total Products</p>
          </div>
        </div>
        <div className='bg-red-400 text-white p-6 rounded-lg shadow-md flex items-center gap-4'>
          <IoShirtOutline size='2.5em' />
          <div>
            <h2 className='text-xl font-bold'>{stats.products.categories.tshirt}</h2>
            <p className='text-sm'>T-Shirts</p>
          </div>
        </div>
        <div className='bg-red-400 text-white p-6 rounded-lg shadow-md flex items-center gap-4'>
          <RiShirtLine size='2.5em' />
          <div>
            <h2 className='text-xl font-bold'>{stats.products.categories.shirt}</h2>
            <p className='text-sm'>Shirts</p>
          </div>
        </div>
        <div className='bg-red-400 text-white p-6 rounded-lg shadow-md flex items-center gap-4'>
          <CgCap size='2.5em' />
          <div>
            <h2 className='text-xl font-bold'>{stats.products.categories.headgear}</h2>
            <p className='text-sm'>Headgear</p>
          </div>
        </div>
      </div>

      {/* Order Status Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-gray-700 text-white p-6 rounded-lg shadow-md flex items-center gap-4'>
          <IoCube size='2.5em' />
          <div>
            <h2 className='text-xl font-bold'>{stats.orders.total}</h2>
            <p className='text-sm'>Total Orders</p>
          </div>
        </div>
        <div className='bg-yellow-500 text-white p-6 rounded-lg shadow-md flex items-center gap-4'>
          <IoHourglass size='2.5em' />
          <div>
            <h2 className='text-xl font-bold'>{stats.orders.status.pending}</h2>
            <p className='text-sm'>Pending Orders</p>
          </div>
        </div>
        <div className='bg-green-500 text-white p-6 rounded-lg shadow-md flex items-center gap-4'>
          <IoShieldCheckmark size='2.5em' />
          <div>
            <h2 className='text-xl font-bold'>{stats.orders.status.confirmed}</h2>
            <p className='text-sm'>Confirmed Orders</p>
          </div>
        </div>
        <div className='bg-red-600 text-white p-6 rounded-lg shadow-md flex items-center gap-4'>
          <IoCloseCircle size='2.5em' />
          <div>
            <h2 className='text-xl font-bold'>{stats.orders.status.cancelled}</h2>
            <p className='text-sm'>Cancelled Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;