import express from "express";
const router = express.Router();
import {
  addOrderItem,
  getMyOrders,
  getMyOrdersById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderConroller.js";
import { protect, admin } from "../middleware/authMiddeleare.js";

router.route("/").post(addOrderItem).get(protect, admin, getOrders);

router.route("/mine").get(protect, getMyOrders);
router.route("/:id").get(protect, admin, getMyOrdersById);
// .put(updateOrderToPaid) // mark as paid
router.route("/:id/deliver").put(protect, updateOrderToDelivered)
router.route("/:id/pay").put(protect, updateOrderToPaid)

// Export the router for use in other files
export default router;
