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

  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshToken: null } },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});

export default signOutUser;
