import ejs from 'ejs';
import userModel from "../model/userModel.js";
import cartModel from "../model/cartModel.js";
import { userRegisterValidator, userLoginValidator } from "../validators/userValidator.js";
import { createUserToken, createUserVerifyUrl } from "../middleware/userAuth.js";
import { createAdminToken } from "../middleware/adminAuth.js";
import transporter from "../config/nodemailerConfig.js";

export const registerUser = async (req, res) => {
  try {
    const result = userRegisterValidator.safeParse(req.body);

    if (!result.success) {
      console.log(result.error);
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Validation failed. Please check the input fields.",
        errors: result.error.errors // send detailed errors
      });
    }

    const { name, email, password } = result.data;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "User already exists."
      });
    }

    const verificationUrl = createUserVerifyUrl({ name, email, password });

    // render EJS template to HTML string
    const htmlContent = await ejs.renderFile(
      "./views/emailVerificationTemplate.ejs",
      {
        email,
        verifyUrl: verificationUrl
      }
    );

    // send email
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Email Verification - Kitsune Store",
      html: htmlContent
    });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Please check your email for verification link."
    });
  } catch (error) {
    
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
      error: error.message || error
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { userVerificationPayload } = req.body;

    if (!userVerificationPayload) {
      return res.status(400).render('verificationError', {
        title: 'Verification Failed',
        message: 'Invalid verification request.',
      });
    }

    const { name, email, password } = userVerificationPayload;

    
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.render('verificationSuccess', {
        title: 'Already Verified',
        message: 'You are already verified! Now login to our shop.',
      });
    }

    
    const newUser = new userModel({ name, email, password });
    await newUser.save();

    
    const newCart = new cartModel({ userId: newUser._id });
    await newCart.save();

    
    res.render('verificationSuccess', {
      title: 'Verification Successful',
      message: 'You are verified! Now login to our shop for shopping.',
    });

  } catch (error) {
    
    res.status(500).render('verificationError', {
      title: 'Server Error',
      message: 'Internal Server Error. Please try again later.',
      error: error.message || error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    // Validate input using Zod
    const validation = userLoginValidator.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Validation failed",
        errors: validation.error.issues.map(err => err.message)
      });
    }

    const { email, password } = validation.data;

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "User does not exist"
      });
    }

    // Compare password using model method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Invalid email or password"
      });
    }

    // Create token
    const token = createUserToken({
      id: user._id,
      name: user.name,
      email: user.email
    });

    // Fetch cart & orders
    const userCart = await cartModel.findOne(
      { userId: user._id },
      "items"
    );
    const userOrders = await orderModel.find({ userId: user._id });

    // Success response
    return res.status(200).json({
      status: 200,
      success: true,
      message: "User logged in successfully",
      token,
      cart: userCart ? userCart.items : {},
      orders: userOrders || []
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hardcoded admin credentials
    const adminCredentials = {
      email: "admin@shop.com",
      password: "Admin@123" // ideally, store hashed in env or DB
    };

    // Check email
    if (email !== adminCredentials.email) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Invalid admin email or password"
      });
    }

    // Check password
    if (password !== adminCredentials.password) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: "Invalid admin email or password"
      });
    }

    // Create token
    const token = createAdminToken({
      role: "admin",
      email: adminCredentials.email
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Admin logged in successfully",
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
