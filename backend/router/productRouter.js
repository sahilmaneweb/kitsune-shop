const express = require("express");
const { allProduct, addProduct, removeProduct } = require("../controller/productController");
const productRoute = express.Router();
const upload = require('../config/fileConfig');


productRoute.get("/allProduct", allProduct);
productRoute.post("/addProduct", upload.single('product'), addProduct);
productRoute.delete("/removeProduct/:id", removeProduct);

module.exports = productRoute;