import User from "../../models/user.model.js";
import { ApiError, asyncHandler } from "../../utils/index.js";
import { signOutUser } from "../auth/index.js";

const deactivateUserAccount = asyncHandler(async (req, res) => {
  // Get req.user from middleware verifyAccessToken
  // validation
  // Update isActive to false
  // Logout the currentUser

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(401, "Unauthorized access");
  }

  user.isActive = false;
  await user.save({ validateBeforeSave: false });

  return await signOutUser(
    req,
    res,
    "Your account has been deactivated and you've been logged out"
  );
});

export default deactivateUserAccount;
