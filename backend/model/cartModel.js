import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

const cartSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    items: {
        type: Map,
        of: Number,
        default: {}
    }
}, { minimize: false, timestamps: true });

cartSchema.methods.convertToOrderItems = async function () {
  const itemsArray = [];

  for (const [productId, sizes] of Object.entries(this.items)) {
    for (const [size, quantity] of Object.entries(sizes)) {
      itemsArray.push({
        _id: productId,
        size,
        quantity
      });
    }
  }

  return itemsArray;
};



export default mongoose.model("Cart", cartSchema);
