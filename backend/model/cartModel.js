import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1, min: 1, max: 9 }
});

cartSchema.index({ userId: 1, productId: 1, size: 1 }, { unique: true });

export default mongoose.model('Cart', cartSchema);
