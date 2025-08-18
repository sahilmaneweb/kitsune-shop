import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { useShopContext } from '../context/ShopContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const Reviews = ({ productId }) => {
    const { isAuthenticated } = useShopContext();
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [reviewMessage, setReviewMessage] = useState('');
    const [rating, setRating] = useState(0);

    const fetchReviews = async () => {
        try {
            const response = await api.get(`/product/reviews/${productId}`);
            if (response.data.success) {
                setReviews(response.data.reviews);
            }
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
            toast.error('Failed to load reviews.');
        } finally {
            setLoadingReviews(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            toast.error('Please log in to submit a review.');
            return;
        }
        if (reviewMessage.length < 10) {
            toast.error('Review must be at least 10 characters long.');
            return;
        }
        if (rating === 0) {
            toast.error('Please provide a star rating.');
            return;
        }

        try {
            const response = await api.post('/product/reviews/add', {
                productId,
                rating,
                message: reviewMessage
            });
            if (response.data.success) {
                setReviews(prevReviews => [response.data.review, ...prevReviews]);
                setReviewMessage('');
                setRating(0);
                toast.success('Review submitted successfully!');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit review.');
        }
    };

    return (
        <section className='mt-12 py-8 border-t border-red-200'>
            <h2 className='text-3xl font-bold text-red-600 mb-6'>Customer Reviews</h2>
            
            {/* Review Form */}
            {isAuthenticated ? (
                <div className='p-6 bg-red-50 rounded-lg shadow-sm mb-6'>
                    <h3 className='text-xl font-bold text-red-600 mb-4'>Write a Review</h3>
                    <form onSubmit={handleReviewSubmit}>
                        <div className='flex items-center gap-1 mb-4'>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={24}
                                    onClick={() => setRating(star)}
                                    className={`cursor-pointer ${rating >= star ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                                />
                            ))}
                        </div>
                        <textarea
                            value={reviewMessage}
                            onChange={(e) => setReviewMessage(e.target.value)}
                            className='w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-red-500'
                            rows={4}
                            placeholder="Share your thoughts on this product..."
                        />
                        <button
                            type="submit"
                            className='mt-4 px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors'
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            ) : (
                <p className='text-center text-lg text-gray-500 mb-6'>Please log in to write a review.</p>
            )}

            {/* Existing Reviews */}
            <div className='space-y-6 max-h-96 overflow-y-auto pr-2'>
                {loadingReviews ? (
                    <p className='text-center text-gray-500'>Loading reviews...</p>
                ) : reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review._id} className='p-6 bg-white rounded-lg shadow-sm'>
                            <div className='flex items-center gap-2 mb-2'>
                                <p className='font-semibold text-lg'>{review.userName}</p>
                                <span className='text-sm text-gray-500'>- {new Date(review.createdAt).toLocaleDateString('en-GB')}</span>
                            </div>
                            <div className='flex text-red-500 gap-1'>
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>
                            <p className='text-gray-700 mt-2'>"{review.message}"</p>
                        </div>
                    ))
                ) : (
                    <p className='text-center text-gray-500'>No reviews yet. Be the first to review!</p>
                )}
            </div>
        </section>
    );
};

export default Reviews;