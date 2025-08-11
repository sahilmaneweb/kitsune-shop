import orderModel from '../model/orderModel.js';

export const allOrder = async (req, res) => {
  try {
    const allOrders = await orderModel.find({});
    if (!allOrders || allOrders.length === 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "No orders to fetch"
      });
    }
    res.status(200).json({
      status: 200,
      success: true,
      message: "All Orders fetched successfully.",
      data: allOrders
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      success: false,
      message: error.message || error
    });
  }
};

export const getUserOrder = async (req, res) => {
  const { userId } = req.body;
  try {
    const userOrders = await orderModel.find({ userId: userId });
    if (!userOrders || userOrders.length === 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "No orders to fetch"
      });
    }
    res.status(200).json({
      status: 200,
      success: true,
      message: "User Orders fetched successfully.",
      data: userOrders
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      success: false,
      message: error.message || error
    });
  }
};

export const addOrder = async (req, res) => {
  const { userId, userName, userContact, userEmail, amount, items, address } = req.body;
  try {
    const order = new orderModel({
      userId,
      userName,
      userEmail,
      userContact,
      amount,
      items,
      address,
      date: Date.now(),
      status: 'Placed'
    });

    const response = await order.save();
    res.status(200).json({
      status: 200,
      success: true,
      message: "Order added successfully",
      response
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      success: false,
      message: error.message || error
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "No such order exists"
      });
    }
    const response = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    res.status(200).json({
      status: 200,
      success: true,
      message: "Order status updated successfully.",
      response
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      success: false,
      message: error.message || error
    });
  }
};
