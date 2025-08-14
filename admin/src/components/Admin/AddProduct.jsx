import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Assuming you've installed react-hot-toast
import Fileui from '../Fileui';
import api from '../../services/api';

const AddProduct = () => {
  const [data, setData] = useState({
    name: '',
    category: 'kitsune-tshirt',
    offerPrice: '',
    price: '',
    description: ''
  });
  const [product, setProduct] = useState(null);

  const clearInput = () => {
    setData({
      name: '',
      category: 'kitsune-tshirt',
      offerPrice: '',
      price: '',
      description: ''
    });
    setProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProduct(e.target.files[0]);
  };

  const uploadProduct = async (e) => {
    e.preventDefault();
    if (!product) {
      toast.error("Please select a product image.");
      return;
    }
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    formData.append('product', product);

    try {
      const response = await api.post('/product/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      if (response.data.success) {
        toast.success("Product added successfully!");
        clearInput();
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className='p-2 mx-auto shadow-xl rounded-sm'>
      <h1 className='text-2xl border-b-2 pb-2 pl-2 shadow-sm text-red-600 font-bold'>Add Product</h1>
      <form onSubmit={uploadProduct}>
        <div className='flex flex-col sm:flex-row justify-between items-start'>
          <div className='w-full px-3'>
            <label htmlFor="name" className='text-lg block my-2 text-red-600 font-semibold'>Product Name</label>
            <input type="text" id="name" name="name" value={data.name} onChange={handleChange} className='block w-full text-md border-2 py-2 px-3 border-red-300 rounded-md focus:outline-none focus:border-red-600' required />

            <label htmlFor="category" className='text-lg block my-2 text-red-600 font-semibold'>Category</label>
            <select name="category" id="category" value={data.category} onChange={handleChange} className='block w-full text-md border-2 py-2 px-3 border-red-300 rounded-md focus:outline-none focus:border-red-600' required>
              <option value="kitsune-tshirt">Kitsune T-shirt</option>
              <option value="kitsune-shirt">Kitsune Shirt</option>
              <option value="kitsune-headgear">Kitsune Headgear</option>
            </select>

            <div className='w-full grid grid-cols-2 gap-3'>
              <div>
                <label htmlFor="price" className='text-lg block my-2 text-red-600 font-semibold'>Price</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">₹</span>
                  <input type="number" id="price" name="price" value={data.price} min="0" onChange={handleChange} className='block w-full text-md border-2 py-2 px-3 pl-8 border-red-300 rounded-md focus:outline-none focus:border-red-600' required />
                </div>
              </div>
              <div>
                <label htmlFor="offerPrice" className='text-lg block my-2 text-red-600 font-semibold'>Offer Price</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">₹</span>
                  <input type="number" id="offerPrice" name="offerPrice" value={data.offerPrice} min="0" onChange={handleChange} className='block w-full text-md border-2 py-2 px-3 pl-8 border-red-300 rounded-md focus:outline-none focus:border-red-600' required />
                </div>
              </div>
            </div>

            <label htmlFor="description" className='text-lg block my-2 text-red-600 font-semibold'>Description</label>
            <textarea name="description" id="description" cols="30" rows="5" value={data.description} onChange={handleChange} className='block w-full text-md border-2 py-2 px-3 mb-2 border-red-300 rounded-md focus:outline-none focus:border-red-600' required></textarea>
          </div>

          <div className='w-full px-3'>
            <label htmlFor="product" className='block sm:mt-4'>
              {
                product ? (
                  <img src={URL.createObjectURL(product)} alt="Product Preview" className='size-96 my-auto rounded-md border-2 border-red-400 shadow-md object-contain' />
                ) : (
                  <Fileui />
                )
              }
            </label>
            <input type="file" name="product" id="product" onChange={handleFileChange} className='hidden' required />
          </div>
        </div>

        <section className='block space-x-2 space-y-2 px-3 mt-3'>
          <button type="submit" className='inline-block text-lg py-2 w-40 border-2 rounded-lg bg-red-600 text-white font-semibold outline-none hover:bg-red-700 transition-colors'>Add Product</button>
          <button type="reset" onClick={clearInput} className='inline-block text-lg py-2 w-40 border-2 rounded-lg border-red-600 bg-white hover:bg-red-100 text-red-600 font-semibold focus:outline-none transition-colors'>Clear Info</button>
        </section>
      </form>
    </div>
  );
};

export default AddProduct;