import cartModel from '../model/cartModel.js';

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id; 

    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "No cart found for this user",
        items: {}
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "User cart fetched successfully",
      items: cart.items
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message || error
    });
  }
};


export const addToCart = async (req, res) => {
  const { productId, size, quantity } = req.body;

  try {
    const userId = req.user.id;

    let userCart = await cartModel.findOne({ userId });

    if (!userCart) {
      userCart = new cartModel({ userId, items: {} });
    }

    // Ensure items is an object
    if (typeof userCart.items !== 'object' || userCart.items === null) {
      userCart.items = {};
    }

    // Ensure productId entry is an object
    if (!userCart.items[productId] || typeof userCart.items[productId] !== 'object') {
      userCart.items[productId] = {};
    }

    const safeQuantity = Math.min(Math.abs(parseInt(quantity)) || 0, 9);
    
    // Update the nested size and quantity
    userCart.items[productId][size] = safeQuantity;

    // Use a more explicit way to update the nested object in Mongoose
    // This ensures Mongoose detects the change in the 'items' object
    await cartModel.updateOne(
      { userId: userId },
      { $set: { [`items.${productId}.${size}`]: safeQuantity } },
      { upsert: true } // Creates a new document if one doesn't exist
    );

    // Fetch the updated cart to send back in the response
    const updatedCart = await cartModel.findOne({ userId });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product added successfully",
      cart: updatedCart.items,
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 400,
      success: false,
      message: error.message || error,
    });
  }
};

export const updateCartQuantity = async (req, res) => {
  const { productId, size, operation } = req.body;

  try {
    const userId = req.user.id; 

    let userCart = await cartModel.findOne({ userId });

    if (!userCart || !userCart.items[productId] || userCart.items[productId][size] === undefined) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Product or size not found in cart",
      });
    }

    const currentQuantity = userCart.items[productId][size];
    let newQuantity;

    switch (operation) {
      case "increment":
        newQuantity = Math.min(currentQuantity + 1, 9);
        break;

      case "decrement":
        newQuantity = Math.max(currentQuantity - 1, 0);
        break;

      default:
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Invalid operation type",
        });
    }

    let updatedCart;

    if (newQuantity === 0) {
      // If quantity becomes 0, remove the size
      const unsetObject = { [`items.${productId}.${size}`]: "" };
      updatedCart = await cartModel.findOneAndUpdate(
        { userId },
        { $unset: unsetObject },
        { new: true }
      );

      // Check if product object is now empty and remove it
      if (Object.keys(updatedCart.items[productId] || {}).length === 0) {
        updatedCart = await cartModel.findOneAndUpdate(
          { userId },
          { $unset: { [`items.${productId}`]: "" } },
          { new: true }
        );
      }
    } else {
      // Otherwise, update the quantity
      const setObject = { [`items.${productId}.${size}`]: newQuantity };
      updatedCart = await cartModel.findOneAndUpdate(
        { userId },
        { $set: setObject },
        { new: true }
      );
    }
    
    res.status(200).json({
      status: 200,
      success: true,
      message: "Product quantity updated successfully",
      cart: updatedCart.items,
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 400,
      success: false,
      message: error.message || error,
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId, size } = req.body;
    const userId = req.user.id;

    if (!userId || !productId || !size) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "userId, productId, and size are required",
      });
    }

    const userCart = await cartModel.findOne({ userId });
    if (!userCart || !userCart.items[productId] || userCart.items[productId][size] === undefined) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Product or size not found in cart",
      });
    }

    let updatedCart = await cartModel.findOneAndUpdate(
      { userId },
      { $unset: { [`items.${productId}.${size}`]: "" } },
      { new: true }
    );

    // Check if the product object is now empty and remove it
    if (Object.keys(updatedCart.items[productId] || {}).length === 0) {
      updatedCart = await cartModel.findOneAndUpdate(
        { userId },
        { $unset: { [`items.${productId}`]: "" } },
        { new: true }
      );
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product removed successfully",
      cart: updatedCart.items,
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 400,
      success: false,
      message: error.message || error,
    });
  }
};

export const clearCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const userCart = await cartModel.findOne({ userId });
    if (!userCart) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Cart not found for user",
      });
    }

    const updatedCart = await cartModel.findOneAndUpdate(
      { userId },
      { items: {} },
      { new: true }
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Cart cleared successfully",
      cart: updatedCart.items,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      success: false,
      message: error.message || error,
    });
  }
};