import React, { useEffect, useState } from 'react';
import hero from '../assets/hero_cover.png';
import { MoveRight } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import toast from 'react-hot-toast';

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await api.get("/product/allProduct");
        if (response.data.success && response.data.data) {
          const newProducts = response.data.data.slice(0, 4);
          setNewArrivals(newProducts);
        }
      } catch (error) {
        toast.error("Failed to fetch products.");
        console.error("Failed to fetch new arrivals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  const handleSeeCollections = () => {
    navigate('/collection');
    window.scrollTo(0, 0);
  };

  return (
    <div className='container p-4'>
      
      {/* Hero Section */}
      <section className='flex flex-col sm:flex-row items-center justify-between gap-8 py-12 px-6 bg-red-100 rounded-2xl shadow-xl mb-12'>
        <div className='space-y-4 text-center sm:text-left'>
          <p className="text-4xl md:text-6xl text-red-700 font-bold leading-tight">
            Kitsune Merchandise
          </p>
          <p className='text-xl md:text-2xl text-gray-800 font-semibold'>
            The Gateway where Otaku Dreams <br /> become Anime Reality
          </p>
          <button
            onClick={handleSeeCollections}
            className='flex items-center gap-2 mx-auto sm:mx-0 text-white font-semibold bg-red-700 hover:bg-red-900 transition-colors duration-200 text-lg px-6 py-3 rounded-xl shadow-md'
          >
            <p>See Collections</p>
            <MoveRight />
          </button>
        </div>
        <div className='w-full sm:w-1/2'>
          <img src={hero} alt="Kitsune Hero" className='w-full rounded-2xl' />
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className='p-3'>
        <h1 className='text-3xl sm:text-4xl font-bold text-red-700 mb-6'>New Arrivals</h1>
        {loading ? (
            <p className='text-center text-lg text-gray-500'>Loading new arrivals...</p>
        ) : newArrivals.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {newArrivals.map((item) => (
              <ProductCard
                key={item._id}
                id={item._id}
                name={item.name}
                image={item.productUrl}
                offerPrice={item.offerPrice}
                price={item.price}
                category={item.category}
              />
            ))}
          </div>
        ) : (
          <p className='text-center text-lg text-gray-500'>No new products found.</p>
        )}
        
        <div className='flex items-center justify-center mt-8'>
          <NavLink
            to="/collection"
            onClick={() => window.scrollTo(0, 0)}
            className='inline-block text-center px-6 py-3 text-lg border-4 border-red-800 text-red-800 font-bold rounded-xl hover:bg-red-800 hover:text-white transition-colors duration-300'
          >
            See All Collections
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default Home;