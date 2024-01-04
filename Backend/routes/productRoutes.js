import express from "express";
const router = express.Router();
import { getProductById, getProducts } from "../controllers/productControlers.js";

// Get all products
router.route("/").get(getProducts);

// Get a specific product by ID
router.route("/:id").get(getProductById);

// Export the router for use in other files
export default router;
