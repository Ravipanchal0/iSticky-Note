import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError, asyncHandler } from "../utils/index.js";

const verifyAccessToken = asyncHandler(async (req, _, next) => {
  const accessToken =
    req.cookies?.accessToken ||
    req.header("Autorization")?.replace("Bearer ", "");

  if (!accessToken) {
    throw new ApiError(401, "Unauthorized access - No token");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(404, "Invalid or expired token");
  }

  const user = await User.findById(decodedToken._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  req.user = user;
  next();
});

export default verifyAccessToken;
