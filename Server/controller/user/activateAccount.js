import User from "../../models/user.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";
import { signInUser } from "../auth/index.js";

const activateUserAccount = asyncHandler(async (req, res) => {
  // Get email and username and password from frontend
  // Validation
  // verify user exist or not with given email and username
  // Password validation
  // Get user from db
  // Update isActive=true
  // login directly

  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordCorrect = await user.isPasswordValid(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credential");
  }

  user.isActive = true;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Your account has been activated"));
});

export default activateUserAccount;
