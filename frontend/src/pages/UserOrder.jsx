import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'

const UserOrder = () => {
  const {token, order ,setOrder} = useContext(ShopContext);


  return (
    <div className='py-2 px-5'>
        <h1 className='font-semibold text-2xl border-b-4 pb-1 mb-2'>My Orders</h1>
        <section>
            {
              order.map((item,index) => (
                <div key={index} className='p-2 border-2 rounded-md shadow-md'>
                <h1 className='text-lg font-semibold border-b pb-1 border-slate-400'>Order Id : {item._id}</h1>
                <section className='grid gap-2 grid-cols-1 md:grid-cols-[2fr_1fr_1fr] lg:grid-cols-[2fr_1fr_0.7fr]'>
                <div className='my-1 border-b pb-1'>
                  <h1>Name: {item.userName}</h1>
                  <h2>Email : {item.userEmail}</h2>
                  <h3>Contact : {item.userContact}</h3>
                  <h1 className='block mt-3'>Address : {item.address.street}, {item.address.city}, {item.address.state}, {item.address.country}, {item.address.zipcode}</h1>
                </div>
                <div className='my-1 border-b pb-1'>
                    <h1>Date : {new Date(item.date).toLocaleDateString()}</h1>
                    <h1>Method : Cash</h1>
                    <h1>Amount : {item.amount}</h1>
                    <h2>Status : Paid</h2>
                </div>
                <div>
                  <h1 className='text-lg mt-3 rounded-md border-slate-400 shadow-md cursor-pointer select-none font-semibold border-2 px-3 py-2'> Status : {item.status}</h1>
                </div>
                </section>
              </div>
              ))
            }

            
        </section>
    </div>
  )
}

export default UserOrder