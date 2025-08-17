import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useShopContext } from '../context/ShopContext';
import CartTotal from '../components/CartTotal';
import { IndianRupee } from 'lucide-react';
import toast from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, addOrder } = useShopContext();

  const [orderForm, setOrderForm] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    contact: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderForm(pre => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['firstName', 'lastName', 'street', 'city', 'state', 'country', 'zipcode', 'contact'];
    const isFilled = requiredFields.every(field => orderForm[field] && orderForm[field].trim() !== '');

    if (!isFilled) {
      toast.error('Please fill in all the required fields.');
      return;
    }

    const orderPayload = {
      userName: `${orderForm.firstName} ${orderForm.lastName}`,
      userContact: orderForm.contact,
      address: {
        street: orderForm.street,
        city: orderForm.city,
        state: orderForm.state,
        country: orderForm.country,
        zipcode: orderForm.zipcode,
      }
    };

    const response = await addOrder(orderPayload);
    
    if (response) {
      Swal.fire({
        title: "Order Placed!",
        text: response.message,
        icon: "success"
      });
      navigate('/myorder');
    }
  };

  return (
    <section className='px-4 flex flex-col lg:flex-row justify-between items-start gap-6 my-6'>

      {/* Billing Details Form */}
      <div className='w-full lg:w-2/3 p-4 rounded-md shadow-md bg-white'>
        <h1 className='text-2xl font-semibold border-b-2 pb-1 mb-4'>Billing Details</h1>
        <form onSubmit={handleSubmit}>
          {/* Name Section */}
          <section className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <div>
              <label htmlFor="firstName" className='block text-lg font-semibold mb-1'>First Name:</label>
              <input type="text" value={orderForm.firstName} onChange={handleChange} name="firstName" id="firstName" className='block w-full text-lg rounded-md border-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300' required />
            </div>
            <div>
              <label htmlFor="lastName" className='block text-lg font-semibold mb-1'>Last Name:</label>
              <input type="text" value={orderForm.lastName} onChange={handleChange} name="lastName" id="lastName" className='block w-full text-lg rounded-md border-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300' required />
            </div>
          </section>

          {/* Contact Section */}
          <section className='mb-4'>
            <div>
              <label htmlFor="contact" className='block text-lg font-semibold mb-1'>Contact No:</label>
              <input type="tel" value={orderForm.contact} onChange={handleChange} name="contact" id="contact" placeholder='1234567890' className='block w-full text-lg rounded-md border-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300' required />
            </div>
          </section>

          {/* Address Section */}
          <section>
            <div className='mb-4'>
              <label htmlFor="street" className='block text-lg font-semibold mb-1'>Street:</label>
              <input type="text" value={orderForm.street} onChange={handleChange} name="street" id="street" className='block w-full text-lg rounded-md border-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300' required />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
              <div>
                <label htmlFor="city" className='block text-lg font-semibold mb-1'>City:</label>
                <input type="text" value={orderForm.city} onChange={handleChange} name="city" id="city" className='block w-full text-lg rounded-md border-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300' required />
              </div>
              <div>
                <label htmlFor="state" className='block text-lg font-semibold mb-1'>State:</label>
                <input type="text" value={orderForm.state} onChange={handleChange} name="state" id="state" className='block w-full text-lg rounded-md border-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300' required />
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label htmlFor="zipcode" className='block text-lg font-semibold mb-1'>Zipcode:</label>
                <input type="text" value={orderForm.zipcode} onChange={handleChange} name="zipcode" id="zipcode" className='block w-full text-lg rounded-md border-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300' required />
              </div>
              <div>
                <label htmlFor="country" className='block text-lg font-semibold mb-1'>Country:</label>
                <input type="text" value={orderForm.country} onChange={handleChange} name="country" id="country" className='block w-full text-lg rounded-md border-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300' required />
              </div>
            </div>
          </section>
          
          <button type="submit" className='w-full mt-6 p-2 rounded-md bg-red-600 text-lg hover:bg-red-800 font-semibold text-white'>
            Confirm Order
          </button>
        </form>
      </div>

      {/* Order Summary Section */}
      <div className='w-full lg:w-1/3 p-4 rounded-md shadow-md bg-white self-start sticky top-28'>
        <h1 className='text-2xl font-semibold border-b-2 pb-1 mb-4'>Order Summary</h1>
        
        {/* Cart items list */}
        {cartItems && cartItems.length > 0 && (
          <div className='max-h-60 overflow-y-auto mb-4 border-b pb-4'>
            {cartItems.map((item) => (
              <div key={item._id} className='flex items-center gap-4 py-2'>
                <img src={item.productId.productUrl} className='size-16 rounded-md object-cover' alt={item.productId.name} />
                <div className='flex-grow'>
                  <p className='font-semibold text-lg'>{item.productId.name}</p>
                  <p className='text-sm text-gray-600'>Size: {item.size} | Qty: {item.quantity}</p>
                </div>
                <div className='text-lg font-bold text-red-600'>
                  <IndianRupee size={16} className='inline-block align-middle'/>
                  {(item.productId.offerPrice * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <CartTotal />
      </div>

    </section>
  );
};

export default Checkout;