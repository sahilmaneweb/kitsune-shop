import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircleMinus, CirclePlus, IndianRupee, ShoppingBag, Star } from 'lucide-react';
import { useShopContext } from '../context/ShopContext';
import toast from 'react-hot-toast';
import api from '../services/api';
import Reviews from '../components/Reviews';
import ProductImageSlider from '../components/ProductImageSlider'; // Import the new component

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, isAuthenticated } = useShopContext();
  const sizes = ['S', 'M', 'L', 'XL'];

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('S');

  const formatCategory = (cat) => {
    if (!cat) return '';
    const parts = cat.split('-');
    return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/product/getProduct/${id}`);
        if (response.data.success) {
          setProduct(response.data.data);
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
    addToCart(product._id, selectedSize, quantity);
    setSelectedSize('S');
    setQuantity(1);
  };

  if (loading) {
    return <div className="text-center text-xl mt-10">Loading product details...</div>;
  }

  if (error || !product) {
    return <div className="text-center text-xl mt-10 text-red-600">{error || 'Product not found.'}</div>;
  }

  return (
    <div className='p-4 container mx-auto'>
      <section className='flex flex-col sm:flex-row gap-8 my-6'>
        {/* Product Image Section */}
        <div className='flex flex-col gap-4 items-center sm:items-start w-full sm:w-1/2 lg:w-2/5'>
          {/* Use the new ProductImageSlider component */}
          <div className='relative w-full rounded-lg shadow-md max-w-xl mx-auto sm:mx-0'>
            <ProductImageSlider imageUrl={product.productUrl} productName={product.name} />
          </div>
        </div>

        {/* Product Details and Controls */}
        <div className='space-y-4 w-full sm:w-1/2 lg:w-3/5'>
          <h2 className='text-xl font-semibold text-red-600 capitalize'>{formatCategory(product.category)}</h2>
          <h1 className='text-4xl font-bold'>{product.name}</h1>
          <p className='text-lg text-gray-700 leading-relaxed'>{product.description}</p>
          
          <div className='flex items-center gap-2'>
            <div className='flex text-red-500 gap-1'>
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} />
              <Star size={20} />
            </div>
            <p className='text-sm text-gray-500'>(3/5 stars)</p>
          </div>
          
          <div className='flex items-center gap-4'>
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

      <Reviews productId={id} />
    </div>
  );
};

export default ProductDetails;