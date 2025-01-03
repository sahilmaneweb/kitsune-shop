const express = require("express");
const authUser = require('../middleware/auth');
const { allOrder, addOrder, updateOrderStatus, getUserOrder } = require("../controller/orderController");
const orderRoute = express.Router();

orderRoute.get("/allOrder", allOrder);
orderRoute.get("/userOrder", authUser ,getUserOrder);
orderRoute.post("/addOrder", authUser, addOrder);
orderRoute.put("/updateOrderStatus", updateOrderStatus);

module.exports = orderRoute;