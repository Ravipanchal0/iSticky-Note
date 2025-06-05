import User from "../../models/user.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";

const updateUserDetails = asyncHandler(async (req, res) => {
  // Get data from the req.body
  // Validate the data
  // Get user using middleware ( auth.middlewre.js)
  // Update user details

  const { username, fullName, email } = req.body;

  if ([username, fullName, email].some((field) => !field.trim())) {
    throw new ApiError(404, "All fields are required");
  }

  const currentUser = req.user;
  if (!currentUser) {
    throw new ApiError(404, "Unathenticated user");
  }

  const user = await User.findOne({ username });

  if (user?._id?.toString() !== currentUser?._id?.toString()) {
    throw new ApiError(409, "Username is already exist");
  }

  const updatedUser = await User.findByIdAndUpdate(
    currentUser._id,
    {
      username,
      fullName,
      email,
    },
    { new: true }
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "User details updated successfully")
    );
});

export default updateUserDetails;
