const express = require("express");
const { registerUser, loginUser } = require("../controller/userController");
const userRoute = express.Router();

userRoute.post("/registerUser", registerUser);
userRoute.post("/loginUser", loginUser);

module.exports = userRoute;