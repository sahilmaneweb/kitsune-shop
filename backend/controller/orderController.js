import orderModel from '../model/orderModel.js';
import cartModel from '../model/cartModel.js';

export const allOrder = async (req, res) => {
  try {
    const allOrders = await orderModel.find({});

    if (!allOrders.length) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "No orders found.",
        data: []
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "All orders fetched successfully.",
      data: allOrders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message || "Something went wrong while fetching orders."
    });
  }
};


export const getUserOrder = async (req, res) => {
  const userId = req.user.id;

  try {
    const userOrders = await orderModel.find({ userId });

    if (!userOrders.length) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "No orders found for this user.",
        data: []
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "User orders fetched successfully.",
      data: userOrders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message || "Something went wrong while fetching user orders."
    });
  }
};


import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

export const addOrder = async (req, res) => {
  const { userName, userContact, address } = req.body;
  const userId = req.user.id;
  const userEmail = req.user.email;

  try {
    const cart = await cartModel.findOne({ userId });
    if (!cart || !cart.items || Object.keys(cart.items).length === 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Cart is empty"
      });
    }

    const itemsArray = await cart.convertToOrderItems();

    // Fetch all product IDs from itemsArray
    const productIds = itemsArray.map(item => item._id);
    const products = await productModel.find({ _id: { $in: productIds } });

    let totalAmount = 0;
    const enrichedItems = itemsArray.map(item => {
      const product = products.find(p => p._id.toString() === item._id.toString());
      if (product) {
        totalAmount += product.offerPrice * item.quantity;
      }
      return item;
    });

    const order = new orderModel({
      userId,
      userName,
      userEmail,
      userContact,
      amount: totalAmount,
      items: enrichedItems,
      address,
      status: "pending"
    });

    const savedOrder = await order.save();

    // Clear cart after placing order
    cart.items = {};
    await cart.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: "Order placed successfully",
      order: savedOrder
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message || "Something went wrong while placing the order"
    });
  }
};


import orderModel from "../models/orderModel.js";

export const confirmOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Order not found"
      });
    }

    if (order.status !== "pending") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `Order is already ${order.status} and cannot be confirmed`
      });
    }

    order.status = "confirmed";
    const updatedOrder = await order.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: "Order confirmed successfully",
      order: updatedOrder
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message || "Something went wrong"
    });
  }
};

export const cancelOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Order not found"
      });
    }

    if (order.status !== "pending") {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `Order is already ${order.status} and cannot be cancelled`
      });
    }

    order.status = "cancelled";
    const updatedOrder = await order.save();

    res.status(200).json({
      status: 200,
      success: true,
      message: "Order cancelled successfully",
      order: updatedOrder
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      success: false,
      message: error.message || "Something went wrong"
    });
  }
};
