import User from "../../models/user.model.js";
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  generateAccessAndRefreshToken,
} from "../../utils/index.js";
import jwt from "jsonwebtoken";

const refreshAccessToken = asyncHandler(async (req, res) => {
  // Get token from req.cookies
  // validation
  // verify token and decoded
  // find user using user id get from decoded token
  // validation user exist or not
  // generate new access and refresh token
  // send them in cookie
  // send response

  const cookieOptions = {
    httpOnly: true,
    secure: false, // false for development only
    sameSite: "Lax", // Lax for local, use None for production
  };

  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized access - no token");
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch (error) {
    throw new ApiError(401, "Invalid token");
  }

  const user = await User.findById(decodedToken._id).select("+refreshToken");

  if (!user || incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "Invalid token");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(200, { accessToken, refreshToken }, "Token refreshed")
    );
});

export default refreshAccessToken;
