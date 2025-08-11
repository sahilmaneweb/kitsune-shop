import express from "express";
import { allProduct, addProduct, removeProduct } from "../controller/productController.js";
import upload from "../config/fileConfig.js";

const productRoute = express.Router();

productRoute.get("/allProduct", allProduct);
productRoute.post("/addProduct", upload.single('product'), addProduct);
productRoute.delete("/removeProduct/:id", removeProduct);

export default productRoute;
