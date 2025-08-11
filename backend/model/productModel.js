import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { 
        type: String, 
        required: true,
        enum: ['kitsune-tees', 'kitsune-headgear', 'kitsune-shirt']
    },
    product: { type: String, required: true },
    offerPrice: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true }
});

export default mongoose.model('Product', productSchema);
