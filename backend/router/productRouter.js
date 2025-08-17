import express from "express";
import { allProduct, addProduct, toggleProductVisibility, getProductById } from "../controller/productController.js";
import upload from "../config/fileConfig.js";
import { authAdmin } from "../middleware/adminAuth.js"

const productRoute = express.Router();

productRoute.get("/allProduct", allProduct);
productRoute.post("/addProduct", authAdmin, upload.single('product'), addProduct);
productRoute.patch("/toggleVisibility/:id", authAdmin, toggleProductVisibility);
productRoute.get('/getProduct/:id', getProductById);

export default productRoute;
