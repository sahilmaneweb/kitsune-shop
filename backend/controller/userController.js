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
    console.log(error);
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

    const newUser = new userModel({ name, email, password });
    await newUser.save();

    const newCart = new cartModel({ userId: newUser._id });
    await newCart.save();

    // On success render success page
    res.render('verificationSuccess', {
      title: 'Verification Successful',
      message: 'You are verified! Now login to our shop for shopping.',
      token: createUserToken({ id: newUser._id, name, email }),
    });

  } catch (error) {
    console.error(error);
    res.status(500).render('verificationError', {
      title: 'Server Error',
      message: 'Internal Server Error. Please try again later.',
      error: error.message || error,
    });
  }
};

export const loginUser = async(req, res) => {
    const {email, password}= req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                status : 400,
                success : false,
                message : "User does not exist"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                status : 400,
                success : false,
                message : "Enter valid credentisals"
            });
        }
        const token = createToken(user._id, user.name, user.email);
        const userCart = await cartModel.findOne({
            userId : user._id
        }, "items amount");
        const userOrder = await orderModel.find({userId : user._id});

        res.status(200).json({
            status : 200,
            success : true,
            message : "User Logged In Successfully",
            token,
            cart : userCart.items,
            order : userOrder
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status:400,
            success : false,
            message: error
        });
    }
}
