import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

const orderSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  userName: { type: String, required: true },
  userContact: { type: Number, required: true },
  userEmail: { type: String, required: true },
  items: [
    {
      _id: {
        type: ObjectId,
        ref: "Product",
        required: true
      },
      size: { type: String, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  amount: { type: Number, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipcode: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ["pending", "cancelled", "confirmed"],
    default: "pending"
  },
  date: { type: Date, default: Date.now }
}, { minimize: false });

export default mongoose.model("Order", orderSchema);
