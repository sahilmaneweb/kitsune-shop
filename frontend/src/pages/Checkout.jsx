import React, { useContext, useEffect ,useState } from 'react'
import CartTotal from '../components/cartTotal'
import Swal from 'sweetalert2';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Checkout = () => {
  const navigate = useNavigate();
  const {cart, token, totalAmount, clearCart} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
  
      const tempData = [];
  
      for(const items in cart){
        for(const item in cart[items]){
          if(cart[items][item] > 0){
            tempData.push({
              id : items,
              size : item,
              quantity : cart[items][item]
            });
          }
        }
      }
      setCartData(tempData);
    }, [cart]);


  const [order, setOrder] = useState({
    firstName : '',
    lastName : '',
    email : '',
    street : '',
    city :' ',
    state : '',
    country : '',
    zipcode : '',
    contact : ''
  });
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setOrder((pre) => ({...pre, [name] : value}));
  }

  const handleSubmit = async(e) => {

    let filled = true;

    for(const i in order){
      
      if( order[i] == ""){
        filled = false;
        Swal.fire({
          title: "Empty Fields!",
          text: "Please fill every field...",
          icon: "warning"
        });
        return;
      }
    }

    const formData = {
        userName : order.firstName + " " + order.lastName,
        userEmail : order.email,
        userContact : order.contact,
        address : {
        street : order.street,
        city : order.city,
        state : order.state,
        country : order.country,
        zipcode : order.zipcode,
        },
        items : cartData,
        amount : totalAmount
    }

    const response = await axios.post('http://localhost:8080/order/addOrder',formData, {headers : {token : token}}).then(res => res.data).catch(err => console.log(err));
    if(response.success){
      Swal.fire({
        title: "Order Placed!",
        text: response.message,
        icon: "success"
      });
      clearCart();
      navigate('/myorder');
    }

    setOrder({
      firstName : '',
      lastName : '',
      email : '',
      street : '',
      city :' ',
      state : '',
      country : '',
      zipcode : '',
      contact : ''
    });
    
  }

  return (
    <section className='px-4 flex flex-col md:flex-row justify-between items-start gap-3'>

      <div className='w-full md:w-[73%] border-2 rounded-md shadow-md py-2 px-3'>
        <h1 className='text-2xl font-semibold border-b-2 pb-1'>Billing Details</h1>

        <section className='w-full grid grid-cols-2 gap-2'>
          <div>
            <label htmlFor="firstName" className='block text-[18px] font-semibold mb-1'>First Name :</label>
            <input type="text" value={order.firstName} onChange={handleChange} name="firstName" id="firstName" className='block border-slate-400 focus:border-red-400 w-full focus:outline-none focus:ring-2 focus:ring-red-300 text-[18px] rounded-md border-2 px-2 py-1'/>
          </div>
          <div>
            <label htmlFor="lastName" className='block text-[18px] font-semibold mb-1'>Last Name :</label>
            <input type="text" value={order.lastName} onChange={handleChange} name="lastName" id="lastName" className='block w-full focus:outline-none focus:ring-2 border-slate-400 focus:border-red-400 focus:ring-red-300 text-[18px] rounded-md border-2 px-2 py-1'/>
          </div>
        </section>

        <section className='w-full grid grid-cols-2 gap-2'>
          <div>
            <label htmlFor="email" className='block text-[18px] font-semibold mb-1'>Email Address :</label>
            <input type="email" value={order.email} onChange={handleChange} name="email" id="email" className='block w-full border-slate-400 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-300 text-[18px] rounded-md border-2 px-2 py-1'/>
          </div>
          <div className='my-1'>
            <label htmlFor="contact" className='block text-[18px] font-semibold mb-1'>Contact No :</label>
            <input type="tel" value={order.contact} onChange={handleChange} name="contact" id="contact" placeholder='1234567890' className='block border-slate-400 focus:border-red-400 w-full focus:outline-none focus:ring-2 focus:ring-red-300 text-[18px] rounded-md border-2 px-2 py-1'/>
        </div>
        </section>

        <div className='my-1'>
            <label htmlFor="street" className='block text-[18px] font-semibold mb-1'>Street :</label>
            <input type="text" value={order.street} onChange={handleChange} name="street" id="street" className='block w-full focus:outline-none focus:ring-2 border-slate-400 focus:border-red-400 focus:ring-red-300 text-[18px] rounded-md border-2 px-2 py-1'/>
        </div>

        <section className="grid grid-cols-2 gap-2">
        <div className='my-1'>
            <label htmlFor="city" className='block text-[18px] font-semibold mb-1'>City :</label>
            <input type="text" value={order.city} onChange={handleChange} name="city" id="city" className='block w-full focus:outline-none focus:ring-2 border-slate-400 focus:border-red-400 focus:ring-red-300 text-[18px] rounded-md border-2 px-2 py-1'/>
        </div>
        <div className='my-1'>
            <label htmlFor="state" className='block text-[18px] font-semibold mb-1'>State :</label>
            <input type="text" value={order.state} onChange={handleChange} name="state" id="state" className='block w-full focus:outline-none border-slate-400 focus:border-red-400 focus:ring-2 focus:ring-red-300 text-[18px] rounded-md border-2 px-2 py-1'/>
        </div>
        <div className='my-1'>
            <label htmlFor="zipcode" className='block text-[18px] font-semibold mb-1'>Zipcode :</label>
            <input type="text" value={order.zipcode} onChange={handleChange} name="zipcode" id="zipcode" className='block w-full focus:outline-none border-slate-400 focus:border-red-400 focus:ring-2 focus:ring-red-300 text-[18px] rounded-md border-2 px-2 py-1'/>
        </div>
        <div className='my-1'>
            <label htmlFor="country" className='block text-[18px] font-semibold mb-1'>Country :</label>
            <input type="text" value={order.country} onChange={handleChange} name="country" id="country" className='block w-full focus:outline-none border-slate-400 focus:border-red-400 focus:ring-2 focus:ring-red-300 text-[18px] rounded-md border-2 px-2 py-1'/>
        </div>
        </section>

      </div>

      <div className='w-full mb-5 md:w-[25%] border-2 rounded-md shadow-md py-2 px-3'>
        <CartTotal text={`Add Order`} />
        
            <button type="button" onClick={handleSubmit} className='w-full mt-2 rounded-sm bg-red-600 text-lg hover:bg-red-800 font-semibold text-white p-1'>
            Confirm Order
            </button>
       
      </div>

    </section>
  )
}

export default Checkout