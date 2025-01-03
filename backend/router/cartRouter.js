const express = require("express");
const { getCart, addToCart, removeFromCart, incrememtProduct, clearCart } = require("../controller/cartController");
const authMiddleware = require("../middleware/auth");
const cartRoute = express.Router();

cartRoute.get("/getCart", authMiddleware, getCart);
cartRoute.post("/addToCart", authMiddleware, addToCart);
cartRoute.post("/clearCart", authMiddleware, clearCart);
cartRoute.post("/removeFromCart", authMiddleware, removeFromCart);
cartRoute.post("/incrementProduct", authMiddleware, incrememtProduct);

module.exports = cartRoute;