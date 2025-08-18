// src/components/ProductImageSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProductImageSlider = ({ imageUrl, productName }) => {
    // Create an array of 5 slides to show as previews
    const slides = Array.from({ length: 5 }, (_, index) => index);

    return (
        <div className='relative rounded-lg shadow-md max-w-xl mx-auto sm:mx-0'>
            <Swiper
                pagination={{
                    type: 'fraction',
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="w-full h-full rounded-lg"
            >
                {slides.map((_, index) => (
                    <SwiperSlide key={index}>
                        <img 
                            src={imageUrl} 
                            alt={`${productName} Preview ${index + 1}`} 
                            className='w-full h-full object-cover' 
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductImageSlider;