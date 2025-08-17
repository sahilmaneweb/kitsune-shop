import React from 'react';
import { IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, image, offerPrice, price, category }) => {
  // Helper function to format the category string
  const formatCategory = (cat) => {
    if (!cat) return '';
    const parts = cat.split('-'); // Splits 'kitsune-tshirt' into ['kitsune', 'tshirt']
    return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' '); // Capitalizes each part and joins them
  };

  return (
    <div className='flex flex-col rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden bg-white cursor-pointer group'>
      <Link to={`/collection/${id}`}>
        <img src={image} alt={name} className='w-full h-72 object-cover object-center rounded-md transform group-hover:scale-105 transition-transform duration-300' />
      </Link>
      <div className='p-4 flex flex-col flex-grow'>
        <Link to={`/collection/${id}`} className='flex flex-col flex-grow'>
          <h1 className='text-lg md:text-xl font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-200'>
            {name}
          </h1>
          {/* Display the formatted category */}
          <p className='text-sm text-gray-500 capitalize mb-2'>{formatCategory(category)}</p>
          <div className='flex items-center gap-2 text-lg md:text-xl font-semibold mt-auto'>
            <h2 className='flex items-center text-red-600'>
              <IndianRupee size={16} className='mr-1' />
              {offerPrice}
            </h2>
            <h2 className='text-gray-500 line-through flex items-center'>
              <IndianRupee size={16} className='mr-1' />
              {price}
            </h2>
          </div>
        </Link>
        {/* <button
          onClick={handleAddToCart}
          className='flex items-center justify-center mt-4 gap-2 text-white bg-red-600 hover:bg-red-800 transition-colors duration-200 rounded-md p-2 text-base font-semibold'
        >
          <ShoppingBag size={20} />
          <p>Add to Cart</p>
        </button> */}
      </div>
    </div>
  );
};

export default ProductCard;