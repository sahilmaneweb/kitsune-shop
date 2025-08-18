import orderModel from "../model/orderModel.js";
import cartModel from "../model/cartModel.js"; // This should be CartItem model now
import productModel from '../model/productModel.js'; // Ensure productModel is imported for clarity


export const allOrder = async (req, res) => {
  try {
    const allOrders = await orderModel.find({}).sort({ date: -1 }); // Added sort by date descending

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
    const userOrders = await orderModel.find({ userId }).sort({ date: -1 }); // Added sort by date descending

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

export const addOrder = async (req, res) => {
  const { userName, userContact, address } = req.body;
  const userId = req.user.id;
  const userEmail = req.user.email;

  try {
    // 1. Fetch cart items and populate with product details
    const cartItems = await cartModel.find({ userId }).populate('productId');

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Cart is empty"
      });
    }

    // 2. Validate all cart items before proceeding
    const invalidItems = cartItems.filter(item => !item.productId || !item.productId.isVisible);

    if (invalidItems.length > 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'One or more items in the cart are no longer available.'
      });
    }

    // 3. Prepare order data
    let totalAmount = 0;
    const enrichedItems = [];
    for (const item of cartItems) {
      enrichedItems.push({
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.offerPrice,
        imageUrl: item.productId.productUrl,
        size: item.size,
        quantity: item.quantity
      });
      totalAmount += item.productId.offerPrice * item.quantity;
    }

    // 4. Create the new order document
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

    // 5. Clear the cart (this is a separate, non-atomic operation)
    await cartModel.deleteMany({ userId });

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

    // Now update the status without re-validating the entire document
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status: "confirmed" },
      { new: true, runValidators: false }
    ).sort({ date: -1 }); // Added sort by date descending

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

    // Now update the status without re-validating the entire document
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status: "cancelled" },
      { new: true, runValidators: false }
    ).sort({ date: -1 }); // Added sort by date descending

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

// backend/controller/orderController.js
// ... imports and other controller functions ...


// Manually define __dirname for ES modules
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

// Manually define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateInvoice = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        
        if (order.status !== 'confirmed') {
            return res.status(400).json({ success: false, message: "Invoice can only be generated for confirmed orders." });
        }

        // Render the EJS template to HTML
        const html = await ejs.renderFile(
            path.join(__dirname, '../views/invoice.ejs'), 
            { order }
        );

        // Use Puppeteer to generate a PDF
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '1cm',
                right: '1cm',
                bottom: '1cm',
                left: '1cm'
            }
        });

        await browser.close();

        // Set the response headers and send the PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="invoice.pdf"');
        res.send(pdfBuffer);

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};