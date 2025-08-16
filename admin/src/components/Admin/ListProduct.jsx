import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListUI from '../Listui'; // The new UI component
import api from '../../services/api';
import { IoRefresh } from "react-icons/io5";
import { toast } from 'react-hot-toast';

function ListProduct() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true); // Added loading state
    const navigate = useNavigate();

    const fetchAllProducts = async () => {
        try {
            const response = await api.get("/product/allProduct");
            if (response.data.data) {
                setData(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
            toast.error("Failed to fetch products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const handleToggleVisibility = (id) => {
        setData(prevData =>
            prevData.map(item =>
                item._id === id ? { ...item, isVisible: !item.isVisible } : item
            )
        );
    };

    const handleAddProductClick = () => {
        navigate('/dashboard/addproduct');
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleRefresh = () => {
        setFilter('all');
        setLoading(true); // Show loading state on refresh
        fetchAllProducts();
    };

    const filteredData = data.filter(item => {
        if (filter === 'all') {
            return true;
        }
        return item.category === filter;
    });

    if (loading) {
        return (
            <div className='flex justify-center items-center h-full text-2xl text-red-600'>
                Loading products...
            </div>
        );
    }

    return (
        <div className='p-2'>
            <h1 className='block pl-2 text-2xl py-2 border-b-2 border-red-400 mb-3 font-semibold'>All Products</h1>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 px-2 gap-4 sm:gap-2">
                <div className="flex items-center gap-2">
                    <label htmlFor="categoryFilter" className="font-semibold text-red-600">Filter by Category:</label>
                    <select
                        id="categoryFilter"
                        value={filter}
                        onChange={handleFilterChange}
                        className='border-2 py-1 px-2 border-red-300 rounded-md focus:outline-none focus:border-red-600'
                    >
                        <option value="all">All</option>
                        <option value="kitsune-tshirt">Kitsune T-shirt</option>
                        <option value="kitsune-shirt">Kitsune Shirt</option>
                        <option value="kitsune-headgear">Kitsune Headgear</option>
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

            {
                filteredData.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 px-2 divide-y-2 md:divide-none divide-red-300'>
                        {
                            filteredData.map((item) => (
                                <ListUI
                                    key={item._id}
                                    id={item._id}
                                    name={item.name}
                                    product={item.productUrl}
                                    category={item.category}
                                    offerPrice={item.offerPrice}
                                    price={item.price}
                                    isVisible={item.isVisible}
                                    onToggleVisibility={handleToggleVisibility}
                                />
                            ))
                        }
                    </div>
                ) : (
                    <div className='w-full text-center py-20 bg-red-100 rounded-lg'>
                        <p className='text-2xl font-bold text-red-600 mb-4'>No Products to see.</p>
                        <button
                            onClick={handleAddProductClick}
                            className='px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300'
                        >
                            Add New Product
                        </button>
                    </div>
                )
            }
        </div>
    );
}

export default ListProduct;