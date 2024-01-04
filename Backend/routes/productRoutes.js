import express from "express";
const router = express.Router();
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// Get all products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// Get a specific product by ID
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    // Find the product with the given id using Product.findById
    const product = await Product.findById(req.params.id);

    // If the product is found, send it as JSON response
    if (product) {
      res.json(product);
    } else {
      // If the product is not found, send a 404 response
      res.status(404).json({ message: "Product not found" });
    }
  })
);

// Export the router for use in other files
export default router;
