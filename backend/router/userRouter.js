import express from "express";
import { registerUser, loginUser, verifyUser, loginAdmin, getDashboardStats } from "../controller/userController.js";
import { verifyTokenFromParams, verifyUserToken } from "../middleware/userAuth.js";
import { verifyAdmin, authAdmin } from "../middleware/adminAuth.js";
 // New import

const userRoute = express.Router();

// --- User-facing public routes ---
userRoute.post("/registerUser", registerUser);
userRoute.get("/verify", verifyTokenFromParams, verifyUser);
userRoute.post("/loginUser", loginUser);
userRoute.get("/verifyUser", verifyUserToken);

// --- Admin-specific public routes ---
userRoute.post("/loginAdmin", loginAdmin);

// --- Admin-specific protected routes ---
userRoute.get("/verifyAdmin", authAdmin, verifyAdmin); 
userRoute.get("/admin/dashboardStats", authAdmin, getDashboardStats);  
export default userRoute;