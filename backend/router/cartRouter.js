import express from "express";
import { 
  getCart, 
  addToCart, 
  removeFromCart, 
  clearCart, 
  updateCartQuantity 
} from "../controller/cartController.js";
import { userAuth } from "../middleware/userAuth.js";

const cartRoute = express.Router();

cartRoute.get("/getCart", userAuth, getCart);
cartRoute.post("/addToCart", userAuth, addToCart);
cartRoute.delete("/clearCart", userAuth, clearCart);
cartRoute.delete("/removeFromCart", userAuth, removeFromCart);
cartRoute.patch("/updateCartQuantity", userAuth, updateCartQuantity);

export default cartRoute;
