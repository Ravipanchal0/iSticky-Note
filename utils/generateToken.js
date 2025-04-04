import User from "../models/user.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

export default generateAccessAndRefreshToken;
