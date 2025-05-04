import { ApiResponse, asyncHandler } from "../../utils/index.js";

const currentUser = asyncHandler(async (req, res) => {
  // Get req.user from middleware verifyAccessToken

  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

export default currentUser;
