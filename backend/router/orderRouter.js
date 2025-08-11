import express from "express";
import { allOrder, addOrder, getUserOrder, confirmOrder, cancelOrder } from "../controller/orderController.js";
import { authAdmin } from "../middleware/authMiddleware.js";
import { authUser } from "../middleware/userAuth.js";

const orderRoute = express.Router();

orderRoute.get("/all", authAdmin, allOrder);
orderRoute.get("/user", authUser, getUserOrder);
orderRoute.post("/add", authUser, addOrder);
orderRoute.patch("/updateStatus/:orderId/confirm", authAdmin, confirmOrder);
orderRoute.patch("/updateStatus/:orderId/cancel", authAdmin, cancelOrder);

export default orderRoute;
