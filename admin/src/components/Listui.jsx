import React from 'react';
import { IoEye, IoEyeOffOutline } from 'react-icons/io5';
import { toast } from 'react-hot-toast';
import api from '../services/api';


const ListUI = ({ id, name, product, category, offerPrice, price, isVisible, onToggleVisibility }) => {
    const toggleProductVisibility = async () => {
        try {
            const endpoint = `/product/toggleVisibility/${id}`;
            await api.patch(endpoint, {
                // The backend might need the new visibility status in the body
                isVisible: !isVisible 
            });
            toast.success(`Product is now ${isVisible ? 'hidden' : 'visible'}.`);
            onToggleVisibility(id);
        } catch (error) {
            console.error("Failed to toggle product visibility:", error);
            toast.error("Failed to update product visibility.");
        }
    };

    return (
        <div className='flex pt-2 gap-3 items-center p-4 bg-white rounded-lg shadow-sm border border-red-100 transition-all hover:shadow-lg'>
            <div className='w-16 h-16 md:w-20 md:h-20 self-start overflow-hidden rounded-md border-red-300 border-2 shadow-sm shadow-red-200 flex-shrink-0'>
                <img src={product} alt={name} className='w-full h-full object-cover' />
            </div>
            <div className='justify-self-start grow flex flex-col items-start'>
                <h1 className='text-sm md:text-lg font-semibold text-red-700'>{name}</h1>
                <h2 className='text-xs md:text-sm text-gray-600'>Category: {category}</h2>
                <h3 className='text-xs md:text-sm font-medium text-red-500'>Offer Price: ${offerPrice}</h3>
                <h3 className='text-xs md:text-sm text-gray-500 line-through'>Actual Price: ${price}</h3>
            </div>
            <div onClick={toggleProductVisibility} className='p-3 rounded-xl cursor-pointer bg-red-500 text-white hover:bg-red-600 transition-colors duration-200'>
                {isVisible ? (
                    <IoEye size="1.5em" />
                ) : (
                    <IoEyeOffOutline size="1.5em" />
                )}
            </div>
        </div>
    );
};

export default ListUI;