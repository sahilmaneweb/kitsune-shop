import express from "express";
import { allOrder, addOrder, getUserOrder, confirmOrder, cancelOrder, generateInvoice } from "../controller/orderController.js";
import { authAdmin } from "../middleware/adminAuth.js";
import { authUser } from "../middleware/userAuth.js";

const orderRoute = express.Router();

orderRoute.get("/allOrders", authAdmin, allOrder);
orderRoute.get("/getOrders", authUser, getUserOrder);
orderRoute.post("/addOrder", authUser, addOrder);
orderRoute.patch("/updateOrderStatus/:orderId/confirm", authAdmin, confirmOrder);
orderRoute.patch("/updateOrderStatus/:orderId/cancel", authAdmin, cancelOrder);

orderRoute.get("/invoice/:orderId", authUser, generateInvoice); // Protect this route


export default orderRoute;
