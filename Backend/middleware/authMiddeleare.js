import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModels.js";

//protect the route
const protect = asyncHandler(async (req, res, next) => {
  let token;

  //read jwt from cookei
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRETE);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not autorized", "token failed");
    }
  } else {
    res.status(401);
    throw new Error("not autorized", "no token");
  }
});

//admin middleware

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin === true) {
    next();
  } else {
    res.status(401);
    throw new Error("not autorized as admin");
  }
};

export { admin, protect };
