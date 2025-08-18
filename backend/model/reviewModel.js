import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    message: { type: String, required: true, minlength: 10 },
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);