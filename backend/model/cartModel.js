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
}, { minimize: false });

cartSchema.methods.convertToOrderItems = async function () {
  const itemsArray = [];

  for (const productId of Object.keys(this.items)) {
    const quantity = this.items[productId];
    // Example: await some async operation here, e.g., fetching product info
    // const productDetails = await ProductModel.findById(productId);

    itemsArray.push({
      _id: productId,
      quantity
    });
  }

  return itemsArray;
};


export default mongoose.model("Cart", cartSchema);
