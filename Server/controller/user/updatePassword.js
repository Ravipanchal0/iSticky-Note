import User from "../../models/user.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";

const updatePassword = asyncHandler(async (req, res) => {
  // Get req.user from middleware verifyAccessToken
  // Get old and new password from frontend
  // validation both user and new password
  // compare old password
  // Hash new password
  // update User using findByIdAndUpdate
  // return response

  const { oldPassword, newPassword } = req.body;

  if (!(newPassword?.trim() && oldPassword?.trim())) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.findById(req.user?._id).select("+password");

  if (!user) {
    throw new ApiError(401, "Unauthorized access");
  }

  const isPasswordCorrect = await user.isPasswordValid(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Old password is incorrect");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password has been changed successfully"));
});

export default updatePassword;
