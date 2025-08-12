import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: {
    type: Object,
    default: {}
  }
});

cartSchema.methods.convertToOrderItems = function() {
  const itemsArray = [];
  if (this.items && typeof this.items === 'object') {
    for (const productId in this.items) {
      if (this.items.hasOwnProperty(productId)) {
        const sizes = this.items[productId];
        for (const size in sizes) {
          if (sizes.hasOwnProperty(size)) {
            itemsArray.push({
              productId: new mongoose.Types.ObjectId(productId),
              size: size,
              quantity: sizes[size]
            });
          }
        }
      }
    }
  }
  return itemsArray;
};

const cartModel = mongoose.model("Cart", cartSchema);

export default cartModel;