import User from "../../models/user.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";

const updatePassword = asyncHandler(async (req, res) => {
  // Get req.user from middleware verifyAccessToken
  // Get new password from frontend
  // validation both user and new password
  // Hash new password
  // update User using findByIdAndUpdate
  // return response

  const { newPassword } = req.body;

  if (!newPassword.trim()) {
    throw new ApiError(400, "New password is required");
  }
  const user = await User.findById(req.user?._id).select("+password");

  if (!user) {
    throw new ApiError(401, "Unauthorized access");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password has been changed successfully"));
});

export default updatePassword;
