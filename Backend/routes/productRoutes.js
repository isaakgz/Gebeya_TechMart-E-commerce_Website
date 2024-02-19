import express from "express";
const router = express.Router();
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getTopProducts, updateProduct } from "../controllers/productControlers.js";
import { protect, admin } from "../middleware/authMiddeleare.js";


// Get all products
router.route("/").get(getProducts);
// Get top rated products
router.route("/top").get(getTopProducts);

// Get a specific product by ID
router.route("/:id").get(getProductById).put(protect, admin,updateProduct).delete(protect, admin,deleteProduct);
//create new review
router.route("/:id/reviews").post(protect, createProductReview);


//create new product

router.route("/").post(protect, admin, createProduct );

// Export the router for use in other files
export default router;
