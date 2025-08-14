import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';
import ListUI from '../Listui';

const ListProduct = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const fetchAllProducts = async () => {
        try {
            const response = await api.get("/product/allProduct");
            if (response.data.data.length > 0) {
                setData(response.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
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
        navigate('/');
    };

    return (
        <div className='p-2'>
            <h1 className='block pl-2 text-2xl py-2 border-b-2 border-red-400 mb-3 font-semibold'>All Products</h1>
            {
                data.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 px-2 divide-y-2 md:divide-none divide-red-300'>
                        {
                            data.map((item) => (
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
};

export default ListProduct;