import { ChevronRight, RefreshCw } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import toast from 'react-hot-toast';

const Collection = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchAllProducts = async () => {
    try {
      const response = await api.get("/product/allProduct");
      if (response.data.success && response.data.data) {
        setAllProducts(response.data.data);
      } else {
        setAllProducts([]);
      }
    } catch (error) {
      toast.error("Failed to fetch products.");
      console.error("Failed to fetch products:", error);
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Filter and sort logic
  useEffect(() => {
    let productsToFilter = allProducts;

    if (filterOptions.length > 0) {
      productsToFilter = allProducts.filter(item => filterOptions.includes(item.category));
    }

    let sortedData = [...productsToFilter];
    switch (sortType) {
      case 'price-asc':
        sortedData.sort((a, b) => a.offerPrice - b.offerPrice);
        break;
      case 'price-desc':
        sortedData.sort((a, b) => b.offerPrice - a.offerPrice);
        break;
      case 'relevant':
      default:
        break;
    }
    setFilteredProducts(sortedData);
  }, [allProducts, filterOptions, sortType]);


  const handleFilter = (value) => {
    setFilterOptions(prevFilters => {
      if (prevFilters.includes(value)) {
        return prevFilters.filter(item => item !== value);
      } else {
        return [...prevFilters, value];
      }
    });
  };
  
  const handleRefresh = () => {
    setFilterOptions([]);
    setSortType('relevant');
    fetchAllProducts();
    toast.success("Filters and sorting reset.");
  };

  if (loading) {
    return <div className='flex justify-center items-center h-screen text-2xl text-red-600'>Loading products...</div>;
  }

  return (
    <div className='p-4 flex flex-col md:flex-row gap-8 items-start justify-between'>
      
      {/* Filter Section */}
      <section className='w-full md:w-3/12 rounded-md px-3 py-2 border-r-2 border-red-200'>
        <div onClick={() => setShowFilter(!showFilter)} className='cursor-pointer flex pb-1 font-semibold items-center gap-1 text-xl border-b-4 border-slate-300'>
          <p>Filter by Category</p>
          <span className={`md:hidden transform transition-transform duration-300 ${showFilter ? "rotate-90" : "rotate-0"}`}>
            <ChevronRight />
          </span>
        </div>

        <div className={`mt-2 p-2 rounded-md transition-all duration-300 ${showFilter ? "block" : "hidden md:block"}`}>
          <div className='flex items-center gap-2 text-lg mb-2'>
            <input type="checkbox" value="kitsune-tshirt" checked={filterOptions.includes("kitsune-tshirt")} onChange={(e) => handleFilter(e.target.value)} className='accent-red-700 size-4' />
            Kitsune T-shirts
          </div>
          <div className='flex items-center gap-2 text-lg mb-2'>
            <input type="checkbox" value="kitsune-shirt" checked={filterOptions.includes("kitsune-shirt")} onChange={(e) => handleFilter(e.target.value)} className='accent-red-700 size-4' />
            Kitsune Shirts
          </div>
          <div className='flex items-center gap-2 text-lg mb-2'>
            <input type="checkbox" value="kitsune-headgear" checked={filterOptions.includes("kitsune-headgear")} onChange={(e) => handleFilter(e.target.value)} className='accent-red-700 size-4' />
            Kitsune Headgear
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className='w-full md:w-10/12'>
        <div className='text-xl sm:text-2xl flex flex-row justify-between items-start sm:items-center font-semibold border-b-4 border-slate-300 pb-2 gap-2'>
          <h1>Collections ({filteredProducts.length})</h1>
          <div className='flex items-center gap-2'>
            <select value={sortType} onChange={(e) => setSortType(e.target.value)} className='text-lg border-2 border-red-600 focus:outline-none cursor-pointer p-1 rounded-md'>
              <option value="relevant">Relevant</option>
              <option value="price-desc">High to Low</option>
              <option value="price-asc">Low to High</option>
            </select>
            <button onClick={handleRefresh} className='bg-red-600 text-white p-2 rounded-md text-sm hover:bg-red-700 transition-colors duration-200'>
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {filteredProducts.map((item) => (
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
          <div className='w-full text-center py-20 bg-gray-100 rounded-lg'>
            <p className='text-2xl font-bold text-gray-600 mb-4'>No products found for this category.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Collection;