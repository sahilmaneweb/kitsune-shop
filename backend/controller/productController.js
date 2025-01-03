const productModel = require('../model/productModel');
const fs = require('fs');

const allProduct = async(req, res) => {
    try{
        const product = await productModel.find({});
        res.status(200).json({
        success : true,
        message : "All Products fetched successfully",
        data : product
    });
    }catch(err){
        console.log(err);
        res.status(400).json({
            status:400,
            success : false,
            message: err
        });
    }
}

const addProduct = async(req, res) => {
    try {    
        const data = new productModel({
            name : req.body.name,
            product : req.file.filename,
            category : req.body.category,
            offerPrice : req.body.offerPrice,
            price : req.body.price,
            description: req.body.description
        });
        await data.save();
        res.status(200).json({
            success : true,
            message : 'product data uploaded successfully',
            product: data,
        })
    } catch (error) {
        res.status(400).json({
            status:400,
            success : false,
            message: error
        });
    }
}

const removeProduct = async(req, res) => {
    try{
        const productId = req.params.id;
    if(!productId){
        return res.status(400).json({
            success : false,
            message : "No product Id provided"
        })
    }
    const product = await productModel.findOne({_id: productId});
    if(!product){
        return res.status(400).json({
            success : false,
            message : "No product with Id exist."
        })
    }
    fs.unlink(`public/productImage/${product.product}`, () => {
    });
    const data =  await productModel.deleteOne({_id : productId});
    res.status(200).json({
        success : true,
        message: 'Product deleted successfully',
        data : data
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            status:400,
            success : false,
            message: err
        });
    }
}

module.exports = { allProduct, addProduct, removeProduct};