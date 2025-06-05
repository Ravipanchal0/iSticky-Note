import express from "express";
import {
  signupUser,
  signInUser,
  signOutUser,
  refreshAccessToken,
  loginViaRefreshToken,
} from "../controller/auth/index.js";
import verifyAccessToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/signup").post(signupUser);
router.route("/login").post(signInUser);
router.route("/logout").post(verifyAccessToken, signOutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/verifyRefreshToken").post(loginViaRefreshToken);

export default router;
