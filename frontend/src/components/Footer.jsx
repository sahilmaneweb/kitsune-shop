import React from 'react';
import logo from '../assets/kitsune-logo.png';
import { Clock, Copyright, Github, Instagram, Linkedin, Phone } from 'lucide-react';

const Footer = () => {
  // Object for social media URLs
  const socialLinks = {
    instagram: "https://www.instagram.com",
    github: "https://www.github.com",
    facebook: "https://www.facebook.com",
    linkedin: "https://www.linkedin.com",
  };

  return (
    <div className='mt-8 pb-4'>
      {/* Newsletter Section */}
      <div className='max-w-[900px] mx-3 sm:mx-auto p-6 lg:p-8 rounded-xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-red-600'>
        <div className='text-center md:text-left text-white'>
          <h1 className='text-2xl md:text-3xl font-bold pb-2'>Subscribe to Our Newsletter</h1>
          <p className='font-semibold text-sm'>Stay up to date with our latest drops and exclusive offers.</p>
        </div>
        <div className='bg-white h-12 border-4 w-full border-red-900 flex justify-between items-center px-2 rounded-lg'>
          <input
            type="email"
            name="newsletter"
            id="newsletter"
            placeholder="Your Email"
            className='h-full flex-grow rounded-3xl focus:outline-none font-semibold text-[17px] px-2'
          />
          <button
            type="button"
            className='px-4 py-1 rounded-lg shadow-md text-md focus:outline-red-300 bg-red-700 text-white font-bold hover:bg-red-800 transition-colors duration-200'
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <footer className='w-full shadow-md rounded-md text-white px-6 py-8 mx-auto mt-6 bg-red-500'>
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6'>
          {/* Brand and Socials */}
          <div className='w-full'>
            <div className='flex items-center pb-2'>
              <img src={logo} alt="Kitsune Logo" className='size-16' />
              <p className='font-bold text-2xl'>Kitsune</p>
            </div>
            <p className='text-sm mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className='flex items-center justify-start gap-3'>
              <a href={socialLinks.instagram} aria-label="Instagram" className='hover:text-red-300 transition-colors'><Instagram size={28} /></a>
              <a href={socialLinks.github} aria-label="GitHub" className='hover:text-red-300 transition-colors'><Github size={28} /></a>
              <a href={socialLinks.facebook} aria-label="Facebook" className='hover:text-red-300 transition-colors'><Facebook size={28} /></a>
              <a href={socialLinks.linkedin} aria-label="LinkedIn" className='hover:text-red-300 transition-colors'><Linkedin size={28} /></a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className='space-y-1'>
            <p className='text-xl font-bold mb-2'>Navigation</p>
            <a href="#" className='block hover:underline hover:text-red-200'>Home</a>
            <a href="#" className='block hover:underline hover:text-red-200'>About Us</a>
            <a href="#" className='block hover:underline hover:text-red-200'>Collection</a>
            <a href="#" className='block hover:underline hover:text-red-200'>Services</a>
          </div>

          {/* Quick Links */}
          <div className='space-y-1'>
            <p className='text-xl font-bold mb-2'>Quick Links</p>
            <a href="#" className='block hover:underline hover:text-red-200'>Contact Us</a>
            <a href="#" className="block hover:underline hover:text-red-200">Blog</a>
            <a href="#" className="block hover:underline hover:text-red-200">Pricing</a>
            <a href="#" className="block hover:underline hover:text-red-200">FAQ</a>
          </div>

          {/* Contact and Work Hours */}
          <div>
            <p className='text-xl font-bold mb-2'>Contact & Hours</p>
            <div className='flex items-center gap-2 text-sm'>
              <Clock size={20} />
              <p>7 AM - 5 PM, Mon - Sat</p>
            </div>
            <p className='text-sm mt-2'>Delectus iste consequatur nostrum architecto dolorem.</p>
            <a href="#" className='inline-flex items-center justify-center py-2 px-4 gap-2 mt-3 rounded-md bg-red-900 cursor-pointer hover:bg-red-800 transition-colors'>
              <Phone size={20} />
              <p className='font-bold text-lg'>Call Us</p>
            </a>
          </div>
        </section>

        <hr className='mt-6 border-red-400' />

        {/* Copyright Section */}
        <div className='flex items-center justify-center gap-2 mt-3 text-sm'>
          <Copyright size={18} />
          <p>2024 - Developed by Sahil Mane - All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;