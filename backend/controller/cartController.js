const cartModel = require('../model/cartModel');

const getCart = async(req, res) => {
    const userId = req.body.userId;
    try {
        const cart = await cartModel.findOne({
            userId : userId
        });
        res.status(200).json({
            status: 200,
            success : true,
            message : "User cart fetched successfully.",
            items : cart.items,
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


const addToCart = async(req, res) => {
    const { userId, productId, size, quantity } = req.body;
    try {
        let userCart = await cartModel.findOne({
            userId : userId
        });
        if(!userCart.items[productId]){
            userCart.items[productId] = {};
        }
        userCart.items[productId][size] = Math.min(quantity, 9);
        await cartModel.findOneAndUpdate({userId : userCart.userId},{items : userCart.items});
        res.status(200).json({
            status: 200,
            success : true,
            message : "Product added successfully",
            cart : userCart.items,
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status:400,
            success : false,
            message: error
        });
    }
}

const incrememtProduct = async(req, res) => {
    const { userId, productId, size, operation } = req.body;
    try {
        let userCart = await cartModel.findOne({
            userId : userId
        });
        switch (operation) {
            case "increment":
                userCart.items[productId][size] = Math.min(userCart.items[productId][size] + 1, 9); 
                break;

            case "decrement":
                userCart.items[productId][size] = Math.max(userCart.items[productId][size] - 1, 0); 
                break;
        
            default:
                break;
        }

        if(userCart.items[productId][size] === 0){
            delete userCart.items[productId][size];
        }
        if(Object.keys(userCart.items[productId]).length === 0){
            delete userCart.items[productId];
        }
        await cartModel.findOneAndUpdate({userId : userCart.userId},{items : userCart.items});
        res.status(200).json({
            status: 200,
            success : true,
            message : "Product incremented successfully",
            cart : userCart.items,
        });


    } catch (error) {
        console.log(error);
        res.status(400).json({
            status:400,
            success : false,
            message: error
        });
    }
}

const removeFromCart = async(req, res) => {
    const { userId, productId, size } = req.body;
    try {
        let userCart = await cartModel.findOne({
            userId : userId
        });
        delete userCart.items[productId][size];
        if(Object.keys(userCart.items[productId]).length === 0){
            delete userCart.items[productId];
        }
        await cartModel.findOneAndUpdate({userId : userCart.userId},{items : userCart.items});
        res.status(200).json({
            status: 200,
            success : true,
            message : "Product removed successfully",
            cart : userCart.items,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status:400,
            success : false,
            message: error
        });
    }
}

const clearCart = async(req, res) => {
    const {userId} = req.body;
    try {
        let userCart = await cartModel.findOne({
            userId : userId
        });
        userCart.items = {};
        await cartModel.findOneAndUpdate({userId : userCart.userId},{items : userCart.items});
        res.status(200).json({
            status: 200,
            success : true,
            message : "Cart cleared succesfully",
            cart : userCart.items,
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status:400,
            success : false,
            message: error
        });
    }
}

module.exports = { getCart, addToCart, incrememtProduct , removeFromCart, clearCart};