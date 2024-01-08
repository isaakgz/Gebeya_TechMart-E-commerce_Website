import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModels.js";

// @desc  auth user & token
// @desc  GET /api/users/Login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  res.send("auth user");
});
// @desc  register user
// @desc  post /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  res.send("regisrtings user");
});

// @desc  Logout the user and clear the cookie
// @desc  post /api/users/logout
// @access private

const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

// @desc get user Profile
// @desc  Get /api/users/Profile
// @access public

const getUserProfile = asyncHandler(async (req, res) => {
  res.send("user Profile");
});

// @desc update user Profile
// @desc  POST /api/users/Profile
// @access private

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user Profile");
});

// @desc get users
// @desc  get /api/users
// @access private/admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});
// @desc get users by id
// @desc  get /api/users/:id
// @access private/admin
const getUsersById = asyncHandler(async (req, res) => {
  res.send("get users by id");
});

// @desc Delete users users
// @desc  Delete /api/users/:id
// @access private/admin
const deleteUsers = asyncHandler(async (req, res) => {
  res.send("delete users");
});

// @desc updates users
// @desc  PUT /api/users/:id
// @access private/admin
const UpdateUser = asyncHandler(async (req, res) => {
  res.send("update users");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUsers,
  getUsersById,
  UpdateUser
};
