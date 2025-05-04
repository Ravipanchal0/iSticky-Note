import User from "../../models/user.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";

const deleteAccount = asyncHandler(async (req, res) => {
  // Get req.user from middleware verifyAccessToken
  // Delete account using findByIdAndDelete
  // clear cookies
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  };

  const user = await User.findByIdAndDelete(req.user?._id);

  if (!user) {
    throw new ApiError(401, "Unauthorized access");
  }

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, null, "Account deleted successfully"));
});

export default deleteAccount;
