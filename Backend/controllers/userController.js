import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModels.js";
import genereteToken from "../utils/generetToken.js";
import Joi from "joi";
import {userSchema} from "../utils/validationSchema.js"
// @desc  auth user & token
// @desc  GET /api/users/Login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check if email and password exist from databse
  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    genereteToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or password");
  }

  res.send("auth user");
});
// @desc  register user
// @desc  post /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("Email already in use");
  } else {
    
    //validate user input
    const { error } = userSchema.validate(req.body);
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }
    // Create a new user and save it into the database

    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });
    if (user) {
      genereteToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("invalid user data");
    }
    res.send("regisrtings user");
  }
});

// @desc  Logout the user and clear the cookie
// @desc  post /api/users/logout
// @access private

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    // maxAge :new Date(0).getTime()
  });
  res.status(201).json({ massage: "logged out successufully" });
});

// @desc get user Profile
// @desc  Get /api/users/Profile
// @access public

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("No user with this id!");
  }

  res.send("user Profile");
});

// @desc update user Profile
// @desc  POST /api/users/Profile
// @access private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
   

    // Validate each field individually
    const {error} = userSchema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400);
      throw new Error(error.details.map((detail) => detail.message).join(", "));
    }

    // Update user fields if they are present in the request
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
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
  UpdateUser,
};
