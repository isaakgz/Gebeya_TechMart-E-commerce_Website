import express from "express";
const router = express.Router();
import { createProduct, getProductById, getProducts, updateProduct } from "../controllers/productControlers.js";
import { protect, admin } from "../middleware/authMiddeleare.js";


// Get all products
router.route("/").get(getProducts);

// Get a specific product by ID
router.route("/:id").get(getProductById).put(protect, admin,updateProduct);

//create new product

router.route("/").post(protect, admin, createProduct );

// Export the router for use in other files
export default router;
