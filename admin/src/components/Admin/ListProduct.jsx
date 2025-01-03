import React, { useEffect, useState } from 'react'
import Listui from '../Listui'
import axios from 'axios';

const ListProduct = () => {
  const url = 'http://localhost:8080/images/';
  const [data, setData] = useState(false);

  const handleRemoveProduct = async(id) => {
    setData((data) => (data.filter(item => item._id != id)));
    if(data.length == 0){
    }
  }

  useEffect(()=>{
    axios.get("http://localhost:8080/product/allProduct").then((response) => {
      if(response.data.data.length > 0){
        setData(response.data.data);
      }
    })
  },[]);
  
  return (
    <div>
      <h1 className='block pl-2 text-2xl  py-2 border-b-2 border-red-400 mb-3'>All Products</h1>
      {
        data.length > 0 ? (
          <div className='grid grid-col-1 divide-y-2 divide-red-300 md:grid-cols-2 gap-x-6 gap-y-2 md:gap-y-4 px-2'>
          {
            data.map((item, index) => (
              <Listui key={index} id={item._id} name={item.name} product={url + item.product} category={item.category} offerPrice={item.offerPrice} price={item.price} onRemove={handleRemoveProduct} />
            ))
          }
          </div>
        ) : (
          <div className='w-full text-center text-xl'>
            No Product in Database
            
          </div>
        )
      }
    </div>
  )
}

export default ListProduct