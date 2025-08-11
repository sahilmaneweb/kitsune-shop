import productModel from '../model/productModel.js';
import fs from 'fs';
import imagekit from '../config/imagekitConfig.js';
import { productValidator } from '../validators/productValidator.js';

export const allProduct = async (req, res) => {
  try {
   const products = await productModel.find();

    if (products.length === 0) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "No products to fetch",
        data: []
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      message: "All products fetched successfully",
      data: products
    });

  } catch (error) {
    console.error("Error fetching products:", error);

    return res.status(500).json({
      status: 500,
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};


export const addProduct = async (req, res) => {
  try {
    
    const parsed = productValidator.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parsed.error.errors
      });
    }

    
    const fileName = `${Date.now()}-${req.file.originalname}`;

    
    const uploadResponse = imagekit.upload({
      file: req.file.buffer,
      fileName,
      transformation: [{ format: 'webp' }]
    });

    
    const data = new productModel({
      name: parsed.name,
      category: parsed.category,
      offerPrice: parsed.offerPrice,
      price: parsed.price,
      description: parsed.description,
      productUrl: uploadResponse.url
    });

    await data.save();

    res.status(201).json({
      success: true,
      message: 'Product uploaded successfully',
      product: data
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message || error
    });
  }
};

export const toggleProductVisibility = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "No product Id provided"
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Toggle isVisible value
    product.isVisible = !product.isVisible;
    await product.save();

    res.status(200).json({
      success: true,
      message: `Product visibility updated to ${product.isVisible}`,
      data: product
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      success: false,
      message: err.message || err
    });
  }
};
