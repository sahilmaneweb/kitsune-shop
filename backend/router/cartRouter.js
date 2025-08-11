import express from "express";
import { getCart, addToCart, removeFromCart, incrememtProduct, clearCart } from "../controller/cartController.js";


const cartRoute = express.Router();

cartRoute.get("/getCart", getCart);
cartRoute.post("/addToCart", addToCart);
cartRoute.post("/clearCart", clearCart);
cartRoute.post("/removeFromCart", removeFromCart);
cartRoute.post("/incrementProduct", incrememtProduct);

export default cartRoute;
