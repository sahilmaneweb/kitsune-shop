import axios from 'axios'
import React from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'

const Listui = ({id, name, product, category, offerPrice, price, onRemove}) => {

  const removeProduct = () => {
    try {
      axios.delete('http://localhost:8080/product/removeProduct/'+id);
      toast.success("Product removed successfully !!")
      onRemove(id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex pt-2 gap-3 items-center'>
      <div className='w-16 self-start item md:w-20 overflow-hidden rounded-md border-red-300 border-2 shadow-md shadow-red-200 '>
        <img src={product} alt="" />
      </div>
      <div className='justify-self-start grow flex flex-col items-start'>
        <h1 className='text-md md:text-xl font-semibold'>{name}</h1>
        <h2 className='text-lg'>Category : {category}</h2>
        <h3 className='text-base'>Offer Price : ${offerPrice}</h3>
        <h3>Actual Price : ${price}</h3>
      </div>
      <div onClick={removeProduct} className='bg-red-500 p-3 rounded-xl cursor-pointer hover:bg-red-600 '>
        <IoTrashOutline size="2em" color='white' />
      </div>
    </div>
  )
}

export default Listui