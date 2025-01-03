const userModel = require("../model/userModel");
const cartModel = require("../model/cartModel");
const orderModel = require("../model/orderModel");
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (id, userName, userEmail) => {
    return jwt.sign({id, userName, userEmail}, "SahilMane");
}

const registerUser = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        console.log(name, email, password);
        const exists = await userModel.findOne({email});
        if(exists){
            return res.status(400).json({
                status : 400,
                success : false,
                message : "User already exists."
            });
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({
                status : 400,
                success : false,
                message : "Enter Valid email address"
            });
        }
        if(password.length < 8){
            return res.status(400).json({
                status : 400,
                success : false,
                message : "Enter password more than 8 characters"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name : name,
            email : email,
            password : hashedPassword
        });
        const user = await newUser.save();
        const userCart = new cartModel({
            userId : user._id,
            amount : 0
        });
        const cart = await userCart.save();
        const token = createToken(user._id, user.name, user.email);

        res.status(200).json({
            status : 200,
            success : true,
            message : "User Registered Successfully",
            token,
            cart : cart.items
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

const loginUser = async(req, res) => {
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

module.exports = { registerUser, loginUser };