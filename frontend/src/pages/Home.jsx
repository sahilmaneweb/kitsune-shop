import React, { useContext } from 'react'
import hero from '../assets/hero_cover.png'
import { MoveRight } from 'lucide-react'
import { NavLink } from 'react-router'
import ProductCard from '../components/ProductCard'
import { ShopContext } from '../context/ShopContext'


const Home = () => {

  const {productData } = useContext(ShopContext);

  return (
    <div className='container p-1'>
      
      <section className='flex flex-col sm:flex-row sm:px-3 items-center justify-evenly gap-4'>

          <div className='space-y-3 h-full'>
            <p className="text-4xl text-center sm:text-left sm:text-5xl text-red-700 font-bold">Kitsune Merchandise</p>
            <p className='text-xl text-center sm:text-left font-semibold'>The Gateway where Otaku Dreams <br /> become Anime Reality</p>
            <button type="button" className='flex items-center hover:shadow-lg gap-2 mx-auto sm:mx-0 text-white font-semibold bg-red-700 hover:bg-red-900 text-[17px] px-5 py-2 rounded-lg'>
              <p>See Collections</p>
              <MoveRight />
            </button>
          </div>

          <div className='w-[100%] sm:w-[50%]'>
            <img src={hero} alt="" />
          </div>
      </section>
      

      <section className='p-3'>
        <h1 className='text-3xl sm:text-4xl font-bold text-red-700'>New Arrivals :-</h1>


        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-3'>
          {
            productData.slice(0,4).map((item, index) => (
              <ProductCard key={index} id={item.id} name={item.name} image={item.image} oldPrice={item.oldPrice} newPrice={item.newPrice} category={item.category} />
            ))
          }
          
        </div>
        <div className='flex items-center justify-center'>
        <NavLink to="/collection" onClick={()=>{scrollTo(0)}} className='inline-block text-center px-3 py-1 text-lg border-4 border-red-800 text-red-800 font-bold rounded-lg'>
              See All Collections
            </NavLink>
        </div>
      </section>


      <section>
        
      </section>
      
    </div>
  )
}

export default Home