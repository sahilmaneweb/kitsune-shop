import React, { useState } from 'react';
import Fileui from '../Fileui';
import api from '../../services/api';
import toast from 'react-hot-toast';

function AddProduct() {
  const [data, setData] = useState({
    name: '',
    category: 'kitsune-tshirt',
    offerPrice: '',
    price: '',
    description: ''
  });
  const [product, setProduct] = useState(null);
  const [uploading, setUploading] = useState(false); // New state for loading

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
    
    setUploading(true); // Start loading state

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("offerPrice", Number(data.offerPrice));
    formData.append("price", Number(data.price));
    formData.append("description", data.description);
    formData.append("product", product);
    
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
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setUploading(false); // End loading state
    }
  };

  return (
    <div className='p-2 mx-auto rounded-sm'>
      <h1 className='text-2xl border-b-2 pb-2 pl-2 shadow-sm text-red-600 font-bold'>Add Product</h1>
      
      {uploading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg text-red-600 font-semibold text-lg flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading product...
          </div>
        </div>
      )}

      <form onSubmit={uploadProduct}>
        <div className='flex flex-col sm:flex-row justify-between items-start'>
          <div className='w-full px-3'>
            <label htmlFor="name" className='text-lg block my-2 text-red-600 font-semibold'>Product Name</label>
            <input type="text" id="name" name="name" value={data.name} onChange={handleChange} className='block w-full text-md border-2 py-2 px-3 border-red-300 rounded-md focus:outline-none focus:border-red-600' required disabled={uploading} />

            <label htmlFor="category" className='text-lg block my-2 text-red-600 font-semibold'>Category</label>
            <select name="category" id="category" value={data.category} onChange={handleChange} className='block w-full text-md border-2 py-2 px-3 border-red-300 rounded-md focus:outline-none focus:border-red-600' required disabled={uploading}>
              <option value="kitsune-tshirt">Kitsune T-shirt</option>
              <option value="kitsune-shirt">Kitsune Shirt</option>
              <option value="kitsune-headgear">Kitsune Headgear</option>
            </select>

            <div className='w-full grid grid-cols-2 gap-3'>
              <div>
                <label htmlFor="price" className='text-lg block my-2 text-red-600 font-semibold'>Price</label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 text-red-600 font-semibold text-lg bg-red-200 border border-r-0 border-red-300 rounded-l-md">₹</span>
                  <input type="number" id="price" name="price" value={data.price} min="0" onChange={handleChange} className='block w-full text-md border-2 py-2 px-3 border-red-300 rounded-r-md focus:outline-none focus:border-red-600' required disabled={uploading} />
                </div>
              </div>
              <div>
                <label htmlFor="offerPrice" className='text-lg block my-2 text-red-600 font-semibold'>Offer Price</label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 text-red-600 font-semibold text-lg bg-red-200 border border-r-0 border-red-300 rounded-l-md">₹</span>
                  <input type="number" id="offerPrice" name="offerPrice" value={data.offerPrice} min="0" onChange={handleChange} className='block w-full text-md border-2 py-2 px-3 border-red-300 rounded-r-md focus:outline-none focus:border-red-600' required disabled={uploading} />
                </div>
              </div>
            </div>

            <label htmlFor="description" className='text-lg block my-2 text-red-600 font-semibold'>Description</label>
            <textarea name="description" id="description" cols="30" rows="5" value={data.description} onChange={handleChange} className='block w-full text-md border-2 py-2 px-3 mb-2 border-red-300 rounded-md focus:outline-none focus:border-red-600' required disabled={uploading}></textarea>
          </div>

          <div className='w-full px-3'>
            <label htmlFor="product" className={`block sm:mt-4 ${uploading ? 'pointer-events-none opacity-50' : ''}`}>
              {
                product ? (
                  <img src={URL.createObjectURL(product)} alt="Product Preview" className='size-96 my-auto rounded-md border-2 border-red-400 shadow-md object-contain' />
                ) : (
                  <Fileui />
                )
              }
            </label>
            <input type="file" name="product" id="product" onChange={handleFileChange} className='hidden' required disabled={uploading} />
          </div>
        </div>

        <section className='block space-x-2 space-y-2 px-3 mt-3'>
          <button type="submit" className={`inline-block text-lg py-2 w-40 border-2 rounded-lg bg-red-600 text-white font-semibold outline-none transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Add Product'}
          </button>
          <button type="reset" onClick={clearInput} className={`inline-block text-lg py-2 w-40 border-2 rounded-lg border-red-600 bg-white hover:bg-red-100 text-red-600 font-semibold focus:outline-none transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={uploading}>
            Clear Info
          </button>
        </section>
      </form>
    </div>
  );
}

export default AddProduct;