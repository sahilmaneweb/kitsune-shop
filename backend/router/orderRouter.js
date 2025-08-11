import express from "express";

import { allOrder, addOrder, updateOrderStatus, getUserOrder } from "../controller/orderController.js";

const orderRoute = express.Router();

orderRoute.get("/allOrder", allOrder);
orderRoute.get("/userOrder", getUserOrder);
orderRoute.post("/addOrder", addOrder);
orderRoute.put("/updateOrderStatus", updateOrderStatus);

export default orderRoute;
