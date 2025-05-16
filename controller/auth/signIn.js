import {
  asyncHandler,
  ApiError,
  ApiResponse,
  generateAccessAndRefreshToken,
} from "../../utils/index.js";
import User from "../../models/user.model.js";

const signInUser = asyncHandler(async (req, res) => {
  // Get credential from frontend
  // Validation
  // Validation user exist or not
  // Password validation
  // Generate tokens
  // send tokens in cookies
  // return

  const cookieOptions = {
    httpOnly: true,
    secure: false, // false for development only
    sameSite: "Lax", // Lax for local, use None for production
  };

  // Get username or email alias loginId and password
  const { loginId, password } = req.body;

  if (!loginId?.trim()) {
    throw new ApiError(400, "Username or Email is required");
  }
  if (!password?.trim()) {
    throw new ApiError(400, "Password is required");
  }

  const user = await User.findOne({
    $or: [
      {
        username: loginId.trim().toLowerCase(),
      },
      { email: loginId.trim().toLowerCase() },
    ],
  }).select("+password");

  if (!user) {
    throw new ApiError(404, "Invalid credential");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Your account is deactivated");
  }

  const isPasswordCorrect = await user.isPasswordValid(password.trim());

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credential");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const { _id, username, email, fullName, isActive } = user;

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: { _id, username, email, fullName, isActive },
          accessToken,
          refreshToken,
        },
        "Logged in seccussfully"
      )
    );
});

export default signInUser;
