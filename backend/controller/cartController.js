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

    
    if (!userCart.items.has(productId)) {
      userCart.items.set(productId, {});
    }

    const productSizes = userCart.items.get(productId);


    const safeQuantity = Math.min(Math.abs(parseInt(quantity)) || 0, 9);

    productSizes[size] = safeQuantity;
    userCart.items.set(productId, productSizes);

    await userCart.save(); 

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product added successfully",
      cart: userCart.items,
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

    if (!userCart || !userCart.items.has(productId) || userCart.items.get(productId)[size] === undefined) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Product or size not found in cart",
      });
    }

    const productSizes = userCart.items.get(productId);

    switch (operation) {
      case "increment":
        productSizes[size] = Math.min(productSizes[size] + 1, 9);
        break;

      case "decrement":
        productSizes[size] = Math.max(productSizes[size] - 1, 0);
        break;

      default:
        return res.status(400).json({
          status: 400,
          success: false,
          message: "Invalid operation type",
        });
    }

    
    if (productSizes[size] === 0) {
      delete productSizes[size];
    }

    
    if (Object.keys(productSizes).length === 0) {
      userCart.items.delete(productId);
    } else {
      userCart.items.set(productId, productSizes);
    }

    await userCart.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product quantity updated successfully",
      cart: userCart.items,
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
    const { userId, productId, size } = req.body;

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

    
    delete userCart.items[productId][size];

    if (Object.keys(userCart.items[productId]).length === 0) {
      delete userCart.items[productId];
    }

    await cartModel.findOneAndUpdate(
      { userId: userCart.userId },
      { items: userCart.items },
      { new: true }
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product removed successfully",
      cart: userCart.items,
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
