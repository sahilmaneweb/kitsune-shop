import { ChevronRight } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { ShopContext } from '../context/ShopContext'

const Collection = () => {

  const {productData } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [filter, setFilter] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const handleFilter = (value) => {
    if(filter.includes(value)){
      setFilter(filter.filter((item) => item != value));
    }else{
      setFilter((prev)=> [...prev, value])
    }
    
  }

  const applyFilter = () => {
    let productCp = productData.slice();

    if(filter.length > 0){
      productCp =  productCp.filter((item)=> filter.includes(item.category));
    }
    setSortType('relevent');
    setFilterProduct(productCp);
  }

  const handleSort = () => {
    let preData = filterProduct.slice();
    
    switch(sortType){
      case 'low-to-high' :
        setFilterProduct(preData.sort((a, b) => (a.newPrice - b.newPrice)));
        break;

        case 'high-to-low':
          setFilterProduct(preData.sort((a, b) => (b.newPrice - a.newPrice)));
          break;

          default:
           applyFilter();
           break;
    }
  }


  useEffect(()=>{
    applyFilter();
    
  }, [filter]);
  
  useEffect(()=>{
    handleSort();
  }, [sortType]);

  

  return (
    <div className='p-4 flex flex-col md:flex-row gap-4 items-start justify-between'>
      
      <section className='w-full md:w-3/12 rounded-md px-3 py-2'>
        <div onClick={()=>setShowFilter(!showFilter)} className='cursor-pointer flex pb-1 font-semibold items-center gap-1 text-xl border-b-4 border-slate-300'>
          <p>Filter</p>
          <span className={`md:hidden relative ${showFilter ? "rotate-90" : "rotate-0"}`}>
            <ChevronRight />
          </span>
        </div>

        <div className={`mt-2 border-2 p-2 md:block ${showFilter ? "block" : "hidden"}`}>
          <div className='flex items-center gap-2 text-lg'>
          <input type="checkbox" value="Kitsune-Tees" onChange={(e) => handleFilter(e.target.value)} className='accent-red-700 size-4' />
          Kitsune-Tees
          </div>
          <div className='flex items-center gap-2 text-lg'>
          <input type="checkbox" value="Kitsune-Shirts" onChange={(e) => handleFilter(e.target.value)} className='accent-red-700 size-4' />
          Kitsune Shirts
          </div>
          <div className='flex items-center gap-2 text-lg'>
          <input type="checkbox" value="Kitsune-Headgear" onChange={(e) => handleFilter(e.target.value)} className='accent-red-700 size-4' />
          Kitsune Headgear
          </div>
        </div>
      </section>


      <section className='w-full md:w-10/12'>
        <div className='text-2xl flex justify-between font-semibold border-b-4 border-slate-300 pb-2  '>
          <h1>Collections ( {filterProduct.length} )</h1>
          <select value={sortType} onChange={(e)=>setSortType(e.target.value)} className='text-lg border-2 border-black focus:outline-none cursor-pointer p-1 rounded-md'>
            <option value="relevant">Relevant</option>
            <option value="high-to-low">High to Low</option>
            <option value="low-to-high">Low to High</option>
          </select>
        </div>

        <div className='mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {
            filterProduct.map((item, index) => (
              <ProductCard key={index} id={item.id} name={item.name} image={item.image} oldPrice={item.oldPrice} newPrice={item.newPrice} category={item.category} />
            ))
          }
        </div>
      </section>
    </div>
  )
}

export default Collection