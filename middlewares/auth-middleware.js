import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
import { UserModel } from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return new Error("not authorized to access this route");
  }
  try {
    //jwt verify or decode token
    const decode = jwt.verify(token, JWT_SECRET);
    console.log(decode);
    req.user = await UserModel.findById(decode.id);
    next();
  } catch (error) {
    console.error(error);
    return next(new Error("not authorized to access this route"));
  }
};
