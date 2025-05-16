import { asyncHandler, ApiError, ApiResponse } from "../../utils/index.js";
import User from "../../models/user.model.js";

const signupUser = asyncHandler(async (req, res) => {
  // Get data from frontend
  const { username, email, fullName, password } = req.body;

  if (
    [username, email, fullName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (user) {
    throw new ApiError(409, "Email or Username is already exist");
  }

  const newUser = await User.create({
    username,
    email,
    fullName,
    password,
  });

  const createdUser = await User.findById(newUser._id);

  if (!createdUser) {
    throw new ApiError(500, "User not created");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "Account created successfully"));
});

export default signupUser;
