import express from "express";
import { allProduct, addProduct, removeProduct } from "../controller/productController.js";
import upload from "../config/fileConfig.js";
import { authAdmin } from "../middleware/adminAuth.js"

const productRoute = express.Router();

productRoute.get("/allProduct", allProduct);
productRoute.post("/addProduct", upload.single('product'), authAdmin, addProduct);
productRoute.patch("/toggleVisibility/:id", authAdmin, toggleProductVisibility);

export default productRoute;
