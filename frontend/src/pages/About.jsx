import React, { useState, useEffect } from 'react';
import { Github, Instagram, Linkedin, ChevronLeft, ChevronRight, Star } from 'lucide-react';
// Assuming you will add your photo here
// import sahilPhoto from '../assets/sahil_man_photo.jpg'; 

const testimonials = [
  {
    id: 1,
    name: "Arpit Pandey",
    photo: "/test-1.jpg",
    review: "Kitsune Merchandise has the most unique designs! The quality is superb and their customer service is top-notch. Highly recommend for any anime enthusiast!",
  },
  {
    id: 2,
    name: "Sudhir Maurya",
    photo: "/test-2.jpg",
    review: "I've bought several items from Kitsune, and I'm always impressed. Their shirts are comfortable, and the prints last forever. A must-visit store!",
  },
  {
    id: 3,
    name: "Sujal Pal",
    photo: "/test-3.jpg",
    review: "Finally, a store that truly understands otaku culture! The designs are authentic, and the prices are fair. My go-to for all anime merch.",
  },
  {
    id: 4,
    name: "Nilesh Parmar",
    photo: "/test-4.jpg",
    review: "Fast shipping and excellent product quality. The attention to detail in their merchandise is incredible. I'll definitely be buying more!",
  },
  {
    id: 5,
    name: "Ayush Patel",
    photo: "/test-5.jpg",
    review: "The quality of the prints on their apparel is fantastic. The colors are so vibrant and they don't fade after washing. Love my new t-shirt!",
  },
  {
    id: 6,
    name: "Kartik Mehta",
    photo: "/test-6.jpg",
    review: "I bought a gift for a friend and they absolutely loved it! The packaging was great and it arrived faster than I expected. Excellent service!",
  },
];

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const socialLinks = {
    github: "https://github.com/sahilmaneweb",
    instagram: "https://instagram.com/sahil_mane_1304",
    linkedin: "https://linkedin.com/in/sahil-mane-b113032ba",
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 7000);
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <div className='p-2 container mx-auto'>
      {/* Introduction Section */}
      <section className='text-center py-8 px-4 bg-red-100 rounded-xl shadow-md mb-8'>
        <h1 className='text-4xl md:text-5xl font-bold text-red-700 mb-4'>About Kitsune Merchandise</h1>
        <p className='text-lg md:text-xl text-gray-800 leading-relaxed max-w-3xl mx-auto'>
          Welcome to Kitsune Merchandise, your ultimate destination for high-quality anime and otaku-inspired apparel and accessories. We are passionate about bringing your favorite characters and series to life through unique designs and premium products. Our mission is to provide fans with merchandise that truly resonates with their love for anime, combining comfort, style, and authenticity.
        </p>
      </section>

      {/* Sahil Man Section */}
      <section className='py-8 px-4 bg-white rounded-xl shadow-md mb-8 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-red-700 mb-6'>Meet the Creator</h2>
        <div className='flex flex-col items-center max-w-md mx-auto'>
          <img 
            src="/owner.jpg"
            alt="Sahil Man" 
            className='rounded-full size-40 object-cover border-4 border-red-500 shadow-lg mb-4' 
          />
          <h3 className='text-2xl font-bold text-gray-800 mb-2'>Sahil Mane</h3>
          <p className='text-md text-gray-600 mb-4'>
            Passionate Full-Stack Developer & Anime Enthusiast
          </p>
          <div className='flex items-center justify-center gap-4'>
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className='text-gray-700 hover:text-red-600 transition-colors'><Github size={32} /></a>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className='text-gray-700 hover:text-red-600 transition-colors'><Instagram size={32} /></a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className='text-gray-700 hover:text-red-600 transition-colors'><Linkedin size={32} /></a>
          </div>
        </div>
      </section>

      {/* Testimonial Slider Section */}
      <section className='py-4 px-4 bg-red-100 rounded-xl shadow-md text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-red-700'>What Our Customers Say</h2>
        <div className='relative max-w-3xl mx-auto'>
          {/* Slider Content */}
          <div className='relative min-h-[18rem] flex items-center justify-center overflow-hidden'>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute w-full p-2 bg-white rounded-lg shadow-md transition-opacity duration-500 ease-in-out
                  ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
              >
                <img 
                  src={testimonial.photo} 
                  alt={testimonial.name} 
                  className='size-20 rounded-full object-cover mx-auto mb-4 border-2 border-red-300' 
                />
                <p className='text-lg italic text-gray-700 mb-3'>"{testimonial.review}"</p>
                <p className='font-bold text-red-600'>- {testimonial.name}</p>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className='flex justify-center  space-x-2'>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`size-3 rounded-full ${index === currentSlide ? 'bg-red-600' : 'bg-gray-300'} hover:bg-red-400 transition-colors`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;