import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GiCardboardBoxClosed } from 'react-icons/gi';
import { toast } from 'react-toastify';

const AllOrder = () => {
 
  const [order, setOrder ] = useState(false);
  const fetchOrder = () => {
    try {
      axios.get("http://localhost:8080/order/allOrder").then((response) => {
        if(response.data.data.length > 0){
          setOrder((prev)=>(response.data.data));
          
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchOrder();
  }, []);

  const onStatusChange = (e, id) => {
    const status = e.target.value;
    axios.put("http://localhost:8080/order/updateOrderStatus", {orderId : id, status}).then((response) => {
      if(response.data.success){
        fetchOrder();
        toast.success("Order status changed successfully.");
      }
    })
    console.log(status);
    fetchOrder();
  };
  return (
    <div className='p-2'>
      <h1 className='block pl-2 text-2xl  py-2 border-b-2 border-red-400 mb-3'>All Orders</h1>
      <div>
        {
          order.length > 0 ? (
            <div>
              {
                order.map((item,index)=>(
                  <div key={index} className='border rounded-lg border-slate-300 p-2'>
                    <h1 className='text-lg'>Order Id : {item._id} </h1>
                    <section className='mt-2 grid gap-3 grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] text-sm'>
                    <div className='border place-self-start border-slate-300 rounded-lg w-16 grid place-items-center'>
                      <GiCardboardBoxClosed size="3em" />
                    </div>
                    <div>
                      {
                        item.items.map((product, index)=>{
                          if(index === item.items.length -1){
                            return <p className='inline-block pr-1 text-base' key={index}>{product.quantity} x {product.productName} </p>
                          }else{
                            return <p className='inline-block pr-1 text-base' key={index}>{product.quantity} x {product.productName} ,</p>
                          }
                        })
                      }
                      <p className='mt-3 font-medium text-base'>{item.userName}</p>
                      <p>{item.userEmail}</p>
                      <p>{item.address.street + " , " + item.address.city + " , " + item.address.state + " , " + item.address.country  + " ,  " +  item.address.zipcode}</p>
                    </div>
                    <div>
                      <p>Items : {item.items.length}</p>
                      <p>Method : Cash</p>
                      <p>Date : {new Date(item.date).toLocaleDateString()}</p>
                    </div>
                    <p className='text-lg'>$ {item.amount}</p>
                    <select value={item.status} onChange={(event)=>{onStatusChange(event, item._id)}} className='border place-self-start justify-self-stretch text-lg border-slate-400 p-2 rounded-md cursor-pointer focus:outline-none'>
                      <option value="placed">Placed</option>
                      <option value="shipping">Shipping</option>
                      <option value="delivered">Delivered</option>
                    </select>
                    </section>
                  </div>
                  
                ))
              }
            </div>
          ) : (
            <div>Empty</div>
          )
        }
      </div>
    </div>
  )
}

export default AllOrder