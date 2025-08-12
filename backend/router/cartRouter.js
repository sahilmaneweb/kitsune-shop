import express from "express";
import { 
  getCart, 
  addToCart, 
  removeFromCart, 
  clearCart, 
  updateCartQuantity 
} from "../controller/cartController.js";
import { authUser } from "../middleware/userAuth.js";

const cartRoute = express.Router();

cartRoute.get("/getCart", authUser, getCart);
cartRoute.post("/addToCart", authUser, addToCart);
cartRoute.delete("/clearCart", authUser, clearCart);
cartRoute.delete("/removeFromCart", authUser, removeFromCart);
cartRoute.patch("/updateCartQuantity", authUser, updateCartQuantity);

export default cartRoute;
