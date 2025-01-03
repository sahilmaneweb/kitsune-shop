import React from 'react'
import logo from '../assets/kitsune-logo.png'
import { Clock, Copyright, Facebook, FacebookIcon, Github, Instagram, Linkedin, Phone } from 'lucide-react'

const Footer = () => {
  return (
    <div>
      <div className='max-w-[900px] mx-3 gap-1 py-3 sm:mx-auto rounded-xl shadow-xl grid grid-cols-1 pr-2 sm:grid-cols-2 items-center justify-between bg-red-600'>
        <div className='text-center sm:text-left px-4 text-white'>
            <h1 className='text-3xl font-bold pb-1'>Subscribe Our Newsletter</h1>
            <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque nisi et iure commodi ducimus aliquid!</p>
        </div>
        <div className='bg-white h-12 border-4 w-full border-red-900 flex justify-between items-center px-1 rounded-lg'>
          <input type="email" name="newsletter" id="newsletter" className=' h-full grow  rounded-3xl focus:outline-none font-semibold text-[17px]' />
          <button type="button" className='px-1 rounded-lg shadow-md shadow-red-200 text-lg focus:outline-red-300 bg-red-700 text-white font-bold'>Subscribe</button>
        </div>
      </div>

      <footer className='w-full shadow-md shadow-black/40 rounded-md text-white  px-3 py-4 mx-auto mt-3 bg-red-500'>
          
          <section className='flex flex-wrap lg:flex-nowrap gap-5 justify-between mb-3'>
          <div className='w-full md:max-w-[400px]'>
            <div className='flex items-center pb-2'>
              <img src={logo} alt="" className='size-16' /> 
              <p className='font-bold text-2xl'>Kitsune Merchandise</p>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem velit dolor voluptatem, ipsum id reiciendis?</p>
            <div className='flex items-center justify-start gap-2 my-2'>
              <Instagram size={28} strokeWidth={2.25} absoluteStrokeWidth />
              <Github size={28} strokeWidth={2.25} absoluteStrokeWidth />
              <Facebook size={28} strokeWidth={2.25} absoluteStrokeWidth />
              <Linkedin size={28} strokeWidth={2.25} absoluteStrokeWidth />
              
            </div>
          </div>

          <div className='grow *:cursor-pointer space-y-1'>
            <p className='text-xl font-bold'>Navigation</p>
            <p>Home</p>
            <p>About Us</p>
            <p>Collection</p>
            <p>Services</p>
            <p>404</p>
          </div>

          <div className='grow *:cursor-pointer space-y-1'>
            <p className='text-xl font-bold'>Quick Links</p>
            <p>Contact Us</p>
            <p>Blog</p>
            <p>Pricing</p>
            <p>Gallary</p>
            <p>FAQ</p>
          </div>


          <div className='grow max-w-[700px]'>
            <p className='text-xl font-bold'>Work Hours</p>
            <div className='inline-flex gap-2 text-[19px] items-center'>
              <Clock />
              <p>7 AM - 5 PM, Mon -Sat</p>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Delectus iste consequatur nostrum architecto dolorem.</p>
            <div className='inline-flex items-center justify-center py-2 px-3 gap-2 mt-3 rounded-md bg-red-900 cursor-pointer'>
              <Phone />
              <p className='font-bold text-lg'>Contact Us</p>
            </div>
          </div>
          </section>
          <hr />
          <div className='flex items-center justify-center gap-2 mt-3'>
            <Copyright />
            <p>2024 - Developed by Sahil Mane - All Rights Reserved</p>
          </div>
      </footer>
    </div>
  )
}

export default Footer