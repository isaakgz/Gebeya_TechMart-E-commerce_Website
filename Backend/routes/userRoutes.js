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

router.route("/").post(registerUser).get(getUsers);

router.post("/logout", logoutUser);
router.post("/login", authUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/:id").delete(deleteUsers).get(getUsersById).put(UpdateUser);

// Export the router for use in other files
export default router;
