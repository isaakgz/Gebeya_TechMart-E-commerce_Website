import express from "express";
const router = express.Router();
import {
  UpdateUser,
  authUser,
  deleteUsers,
  getUserProfile,
  getUsers,
  getUsersById,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddeleare.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);

router.post("/logout", logoutUser);
router.post("/auth", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUsers)
  .get(protect, admin, getUsersById)
  .put(UpdateUser);

// Export the router for use in other files
export default router;
