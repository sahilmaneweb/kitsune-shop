import React, { useState } from 'react'
import Fileui from '../Fileui';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProduct = () => {

  const [data, setData] = useState({
    name : "",
    category : "T-shirt",
    offerPrice : "",
    price : "",
    description : ""
  });
  const clearInput = () => {
    setData({
      name : "",
      category : "T-shirt",
      offerPrice : "",
      price : "",
      description : ""
    });
    setProduct(false);
  }
  const [product, setProduct]= useState(false);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data)=> ({...data, [name]: [value]}));
  }
  const handleFileChange = (e) => {
    setProduct(e.target.files[0]);
  }

  const uploadProduct = async(e)=>{
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name",data.name)
    formdata.append("category",data.category)
    formdata.append("offerPrice",data.offerPrice)
    formdata.append("price",data.price)
    formdata.append("description",data.description)
    formdata.append("product",product)
    const response = await axios.post('http://localhost:8080/product/addProduct',formdata);
    if(response.data.success){
      toast.success("Product added Successfully !!");
      setData({
        name : "",
        category : "T-shirt",
        offerPrice : "",
        price : "",
        description : ""
      });
      setProduct(false);
    }
  }
  return (
    <div className='p-2 mx-auto shadow-xl rounded-sm'>
        <h1 className='text-2xl border-b-2 pb-2 pl-2 shadow-sm'>Add Product</h1>

        <div className='flex flex-col sm:flex-row justify-between items-start'>

          <div className='w-full px-3'>
            <label htmlFor="name" className='text-lg block my-2'>Product Name</label>
            <input type="text" id="name" name="name" value={data.name} onChange={handleChange} className='block w-full text-md border-2 py-1 px-2 border-red-300 rounded-md focus:outline-none focus:border-red-700' />

            <label htmlFor="category" className='text-lg block my-2'>Category</label>
            <select name="category" id="category" onChange={handleChange} className='block w-full text-md border-2 py-1 px-2 border-red-300 rounded-md focus:outline-none focus:border-red-700'>
              <option value="T-shirt">Kitsune T-shirt</option>
              <option value="Shirt">Kitsune Shirt</option>
              <option value="Headgear">Kitsune Headgear</option>
            </select>

            <div className='w-full grid grid-cols-2 gap-3'>
                <div>
                  <label htmlFor="price" className='text-lg block my-2'>Price</label>
                  <input type="number" id="price" name="price" value={data.price} min="0" onChange={handleChange} className='block w-full text-md border-2 py-1 px-2 border-red-300 rounded-md focus:outline-none focus:border-red-700' />
                </div>

                <div>
                  <label htmlFor="offerPrice" className='text-lg block my-2'>Offer Price</label>
                  <input type="number" id="offerPrice" name="offerPrice" value={data.offerPrice} min="0" onChange={handleChange} className='block w-full text-md border-2 py-1 px-2 border-red-300 rounded-md focus:outline-none focus:border-red-700' />
                </div>
            </div>
            
            <label htmlFor="description" className='text-lg block my-2'>Description</label>
            <textarea name="description" id="description" cols="30" rows="5" value={data.description} onChange={handleChange} className='block w-full text-md border-2 py-1 px-2 mb-2 border-red-300 rounded-md focus:outline-none focus:border-red-700'></textarea>

          </div>

          <div className='w-full px-3'>

            <label htmlFor="product" className='block items-center justify-center sm:mt-4'>
              {
                product ? (
                  <img src={URL.createObjectURL(product)} alt="image" className='size-96 my-auto rounded-md border-2 border-red-400 shadow-md ' />
                ):(
                  <div>
                    <Fileui />
                  </div>
                )
              }
            </label>
            <input type="file" name="product" id="product" onChange={handleFileChange} className='hidden' />

          </div>
        </div>

        <section className='block space-x-2 space-y-2 px-3 mt-3'>
          <button type="submit" onClick={uploadProduct} className='inline-block text-lg py-2 w-40 border-2 border-red-300 rounded-lg bg-red-600 text-white font-semibold outline-none '>Add Product</button>
          <button type="reset" onClick={clearInput} className='inline-block text-lg py-2 w-40 border-2 rounded-lg border-red-300 bg-white hover:bg-red-100  text-red-600 font-semibold focus:outline-none'>Clear Info</button>
        </section>
    </div>
  )
}

export default AddProduct