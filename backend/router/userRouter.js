import express from "express";
import { authUser, verifyTokenFromParams, verifyUserToken } from "../middleware/userAuth.js"
import { registerUser, loginUser, verifyUser } from "../controller/userController.js";

const userRoute = express.Router();

userRoute.post("/registerUser", registerUser);
userRoute.post("/loginUser", loginUser);
userRoute.post("/verify", verifyTokenFromParams, verifyUser);

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
