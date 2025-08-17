import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircleMinus, CirclePlus, IndianRupee, ShoppingBag } from 'lucide-react';
import { useShopContext } from '../context/ShopContext';
import toast from 'react-hot-toast';
import api from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const { addProduct, isAuthenticated } = useShopContext();
  const sizes = ['S', 'M', 'L', 'XL'];

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('S');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/product/getProduct/${id}`);
        if (response.data.success) {
          setProduct(response.data.data);
          // Set initial size and quantity
          setSelectedSize('S');
          setQuantity(1);
        } else {
          setError('Product not found.');
          toast.error('Product not found.');
        }
      } catch (err) {
        setError('Failed to fetch product data.');
        toast.error('Failed to fetch product data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to your cart.');
      return;
    }
    if (!product || !product.isVisible) {
      toast.error('Product is not available for purchase.');
      return;
    }
    addProduct(product._id, selectedSize, quantity);
  };

  if (loading) {
    return <div className="text-center text-xl mt-10">Loading product details...</div>;
  }

  if (error || !product) {
    return <div className="text-center text-xl mt-10 text-red-600">{error || 'Product not found.'}</div>;
  }

  return (
    <div className='p-4 container mx-auto'>
      <section className='grid grid-cols-1 sm:grid-cols-2 gap-8 my-6'>
        {/* Product Image Section */}
        <div className='flex flex-col gap-4'>
          <div className='rounded-lg overflow-hidden shadow-md'>
            <img src={product.productUrl} alt={product.name} className='w-full h-auto object-cover' />
          </div>
          {/* <div className='grid grid-cols-4 gap-2'>
            <img src={product.productUrl} className='w-full h-24 object-cover rounded-md cursor-pointer border-2 border-red-500' alt="Product thumbnail" />
            <img src={product.productUrl} className='w-full h-24 object-cover rounded-md cursor-pointer' alt="Product thumbnail" />
            <img src={product.productUrl} className='w-full h-24 object-cover rounded-md cursor-pointer' alt="Product thumbnail" />
            <img src={product.productUrl} className='w-full h-24 object-cover rounded-md cursor-pointer' alt="Product thumbnail" />
          </div> */}
        </div>

        {/* Product Details and Controls */}
        <div className='space-y-6'>
          <h2 className='text-xl font-semibold text-red-600 capitalize'>{product.category.replace('kitsune-', '')}</h2>
          <h1 className='text-4xl font-bold'>{product.name}</h1>
          <p className='text-lg text-gray-700 leading-relaxed'>{product.description}</p>
          
          <div className='flex items-center gap-4 my-2'>
            <h1 className='flex items-center gap-1 text-3xl font-bold'><IndianRupee size={24} /> {product.offerPrice}</h1>
            <h1 className='flex items-center gap-1 text-2xl line-through text-red-700 opacity-60'><IndianRupee size={20} /> {product.price}</h1>
          </div>
          
          <div>
            <h3 className='text-lg font-semibold mb-2'>Select Size:</h3>
            <div className='flex gap-3 text-xl text-red-700 font-bold'>
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`grid place-items-center size-12 rounded-md transition-colors duration-200 cursor-pointer ${
                    selectedSize === size
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className='flex items-center gap-4 text-xl'>
            <div className='flex items-center gap-2 border-2 rounded-md p-2 border-black'>
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className='select-none cursor-pointer text-red-600'
              >
                <CircleMinus size={30} />
              </button>
              <span className='grid place-items-center size-8 select-none text-gray-800'>{quantity}</span>
              <button
                onClick={() => setQuantity(prev => Math.min(9, prev + 1))}
                className='select-none cursor-pointer text-red-600'
              >
                <CirclePlus size={30} />
              </button>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={!product.isVisible}
              className={`bg-red-700 grow flex justify-center items-center gap-2 text-white px-6 py-3 rounded-lg ring-2 ring-red-300 text-xl font-semibold transition-colors duration-200
                ${!product.isVisible ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-900'}
              `}
            >
              <ShoppingBag />
              <p>{product.isVisible ? 'Add to Cart' : 'Currently Unavailable'}</p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;