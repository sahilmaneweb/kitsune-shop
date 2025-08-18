import { ZodError, z } from 'zod';
import productModel from '../model/productModel.js';
import Review from '../model/reviewModel.js';
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

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully.',
      data: product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product.'
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    // Manually convert price fields from strings to numbers before validation
    const dataToValidate = {
      ...req.body,
      offerPrice: Number(req.body.offerPrice),
      price: Number(req.body.price),
    };

    const parsed = productValidator.safeParse(dataToValidate);

    if (!parsed.success) {
      console.error("Validation error:", parsed.error);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parsed.error.errors
      });
    }

    const fileName = `${Date.now()}-${req.file.originalname}`;

    const uploadResponse = await imagekit.upload({
      file: req.file.buffer.toString('base64'),
      fileName,
      folder: '/kitsune-product-images/',
    });

    const { name, category, offerPrice, price, description } = parsed.data;

    const data = new productModel({
      name,
      category,
      offerPrice,
      price,
      description,
      productUrl : uploadResponse.url
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



// Zod validator for new reviews
const reviewValidator = z.object({
    productId: z.string().nonempty('Product ID is required'),
    rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
    message: z.string().min(10, 'Review message must be at least 10 characters long'),
});

// Get all reviews for a specific product
export const getReviewsByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Review.find({ productId }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch reviews.' });
    }
};

// Add a new review
export const addReview = async (req, res) => {
    try {
        const { productId, rating, message } = req.body;
        const userId = req.user.id;
        const userName = req.user.name; // Assuming user's name is in the token payload

        const validatedData = reviewValidator.parse({ productId, rating: Number(rating), message });
        
        const newReview = new Review({
            productId: validatedData.productId,
            userId,
            userName,
            rating: validatedData.rating,
            message: validatedData.message,
        });

        await newReview.save();

        res.status(201).json({ success: true, message: 'Review submitted successfully!', review: newReview });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ success: false, message: error.errors[0].message });
        }
        res.status(500).json({ success: false, message: 'Failed to submit review.' });
    }
};