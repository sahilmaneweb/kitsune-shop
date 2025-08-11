import express from "express";
import {  verifyTokenFromParams, verifyUserToken } from "../middleware/userAuth.js"
import { verifyAdmin} from "../middleware/adminAuth.js";
import { registerUser, loginUser, verifyUser, loginAdmin } from "../controller/userController.js";


const userRoute = express.Router();

userRoute.post("/registerUser", registerUser);
userRoute.post("/verify", verifyTokenFromParams, verifyUser);

userRoute.post("/loginUser", loginUser);
userRoute.get("/verifyUser", verifyUserToken);

userRoute.get("/verifyAdmin", verifyAdmin);
userRoute.post("/loginAdmin", loginAdmin);

userRoute.get("/preview/emailTemplate", (req, res) => {
    // res.render("../views/emailVerificationTemplate.ejs", {
    //     email: "user@example.com",
    //     verifyUrl: "http://localhost:8080/user/verify?token=sampletoken"
    // });
    return res.status(400).render('verificationError', {
        title: 'Verification Failed',
        message: 'Invalid verification request.',
        error: 'This is a preview route, please use the actual verification endpoint.'
      });
});

export default userRoute;
