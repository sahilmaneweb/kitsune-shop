import cartModel from '../model/cartModel.js';
import productModel from '../model/productModel.js';

const validateQuantity = (quantity) => {
  const parsedQuantity = parseInt(quantity);
  if (isNaN(parsedQuantity) || parsedQuantity < 1) return 1;
  if (parsedQuantity > 9) return 9;
  return parsedQuantity;
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await cartModel.find({ userId }).populate('productId', 'name offerPrice productUrl isVisible');

    const totalCalculatedPrice = cartItems.reduce((acc, item) => {
      if (item.productId && item.productId.isVisible) {
        return acc + (item.productId.offerPrice * item.quantity);
      }
      return acc;
    }, 0);

    res.status(200).json({
      status: 200,
      success: true,
      message: "User cart fetched successfully",
      items: cartItems,
      totalPrice: totalCalculatedPrice,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message || error
    });
  }
};

export const addToCart = async (req, res) => {
  const { productId, size, quantity } = req.body;
  const userId = req.user.id;

  try {
    const product = await productModel.findById(productId);
    if (!product || !product.isVisible) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Product not found or not available."
      });
    }

    const safeQuantity = validateQuantity(quantity);
    
    const updatedCartItem = await cartModel.findOneAndUpdate(
      { userId, productId, size },
      { $set: { quantity: safeQuantity } }, // Using $set to overwrite the quantity
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product added to cart successfully",
      item: updatedCartItem,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message || error,
    });
  }
};

export const updateCartQuantity = async (req, res) => {
  const { productId, size, operation } = req.body;
  const userId = req.user.id;

  try {
    let updatedItem;
    if (operation === 'increment') {
      updatedItem = await cartModel.findOneAndUpdate(
        { userId, productId, size, quantity: { $lt: 9 } },
        { $inc: { quantity: 1 } },
        { new: true }
      );
      if (!updatedItem) {
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Item not found or quantity is already at maximum."
        });
      }
    } else if (operation === 'decrement') {
      const item = await cartModel.findOne({ userId, productId, size });
      if (!item) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "Item not found in cart."
        });
      }
      if (item.quantity <= 1) {
        await cartModel.findByIdAndDelete(item._id);
        return res.status(200).json({
          status: 200,
          success: true,
          message: "Item removed from cart.",
        });
      }
      updatedItem = await cartModel.findOneAndUpdate(
        { userId, productId, size },
        { $inc: { quantity: -1 } },
        { new: true }
      );
    } else {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Invalid operation type.",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: `Product quantity ${operation}ed successfully`,
      item: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message || error,
    });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId, size } = req.body;
  const userId = req.user.id;

  try {
    const result = await cartModel.findOneAndDelete({ userId, productId, size });

    if (!result) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Item not found in cart.'
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Product removed successfully.'
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message || error
    });
  }
};

export const clearCart = async (req, res) => {
  const userId = req.user.id;
  try {
    await cartModel.deleteMany({ userId });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Cart cleared successfully"
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message || error
    });
  }
};
