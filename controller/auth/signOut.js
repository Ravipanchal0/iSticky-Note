import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";
import User from "../../models/user.model.js";

const signOutUser = asyncHandler(async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0),
  };

  // Middleware verifyAccessToken
  const userData = req.user;

  if (!userData) {
    throw new ApiError(401, "Unauthorized access");
  }

  const user = await User.findById(userData._id).select("+refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.refreshToken = "";
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .cookie("accessToken", "", cookieOptions)
    .cookie("refreshToken", "", cookieOptions)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});

export default signOutUser;
