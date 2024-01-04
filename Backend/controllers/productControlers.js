import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
 


const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Find the product with the given id using Product.findById
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // If the product is found, send it as JSON response
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

export { getProducts, getProductById };
