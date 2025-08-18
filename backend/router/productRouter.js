import express from "express";
import { allProduct, addProduct, toggleProductVisibility, getProductById, getReviewsByProductId, addReview } from "../controller/productController.js";
import upload from "../config/fileConfig.js";
import { authAdmin } from "../middleware/adminAuth.js"
import { authUser } from "../middleware/userAuth.js"

const productRoute = express.Router();

productRoute.get("/allProduct", allProduct);
productRoute.post("/addProduct", authAdmin, upload.single('product'), addProduct);
productRoute.patch("/toggleVisibility/:id", authAdmin, toggleProductVisibility);
productRoute.get('/getProduct/:id', getProductById);


productRoute.get("/reviews/:productId", getReviewsByProductId); // Public route to view reviews
productRoute.post("/reviews/add", authUser, addReview);

export default productRoute;
