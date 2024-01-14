import jwt from "jsonwebtoken";

const genereteToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRETE, {
    expiresIn: "30d",
  });

  //set jwt as HTTP-only Cooki

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "developemnt",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default genereteToken;
