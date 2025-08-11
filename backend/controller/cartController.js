import cartModel from '../model/cartModel.js';

export const getCart = async (req, res) => {
  const userId = req.body.userId;
  try {
    const cart = await cartModel.findOne({ userId: userId });
    res.status(200).json({
      status: 200,
      success: true,
      message: "User cart fetched successfully.",
      items: cart ? cart.items : {},
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

export const addToCart = async (req, res) => {
  const { userId, productId, size, quantity } = req.body;
  try {
    let userCart = await cartModel.findOne({ userId: userId });
    if (!userCart) {
      // If no cart found, create one
      userCart = new cartModel({ userId, items: {} });
    }
    if (!userCart.items[productId]) {
      userCart.items[productId] = {};
    }
    userCart.items[productId][size] = Math.min(quantity, 9);
    await cartModel.findOneAndUpdate({ userId: userCart.userId }, { items: userCart.items });
    res.status(200).json({
      status: 200,
      success: true,
      message: "Product added successfully",
      cart: userCart.items,
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

export const incrememtProduct = async (req, res) => {
  const { userId, productId, size, operation } = req.body;
  try {
    let userCart = await cartModel.findOne({ userId: userId });
    if (!userCart || !userCart.items[productId] || userCart.items[productId][size] === undefined) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Product or size not found in cart",
      });
    }

    switch (operation) {
      case "increment":
        userCart.items[productId][size] = Math.min(userCart.items[productId][size] + 1, 9);
        break;

      case "decrement":
        userCart.items[productId][size] = Math.max(userCart.items[productId][size] - 1, 0);
        break;

      default:
        break;
    }

    if (userCart.items[productId][size] === 0) {
      delete userCart.items[productId][size];
    }
    if (Object.keys(userCart.items[productId]).length === 0) {
      delete userCart.items[productId];
    }
    await cartModel.findOneAndUpdate({ userId: userCart.userId }, { items: userCart.items });
    res.status(200).json({
      status: 200,
      success: true,
      message: "Product quantity updated successfully",
      cart: userCart.items,
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

export const removeFromCart = async (req, res) => {
  const { userId, productId, size } = req.body;
  try {
    let userCart = await cartModel.findOne({ userId: userId });
    if (!userCart || !userCart.items[productId] || !userCart.items[productId][size]) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Product or size not found in cart",
      });
    }
    delete userCart.items[productId][size];
    if (Object.keys(userCart.items[productId]).length === 0) {
      delete userCart.items[productId];
    }
    await cartModel.findOneAndUpdate({ userId: userCart.userId }, { items: userCart.items });
    res.status(200).json({
      status: 200,
      success: true,
      message: "Product removed successfully",
      cart: userCart.items,
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

export const clearCart = async (req, res) => {
  const { userId } = req.body;
  try {
    let userCart = await cartModel.findOne({ userId: userId });
    if (!userCart) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Cart not found for user",
      });
    }
    userCart.items = {};
    await cartModel.findOneAndUpdate({ userId: userCart.userId }, { items: userCart.items });
    res.status(200).json({
      status: 200,
      success: true,
      message: "Cart cleared successfully",
      cart: userCart.items,
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
