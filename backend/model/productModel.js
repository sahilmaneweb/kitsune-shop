import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { 
        type: String, 
        required: true,
        enum: ['kitsune-tees', 'kitsune-headgear', 'kitsune-shirt']
    },
    productUrl: { type: String, required: true },
    offerPrice: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    isVisible : {type: Boolean, default: true}
},{timestamps: true});

export default mongoose.model('Product', productSchema);
