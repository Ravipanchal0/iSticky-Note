import express from "express";
import {
  signupUser,
  signInUser,
  signOutUser,
  refreshAccessToken,
} from "../controller/auth/index.js";
import verifyAccessToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/signup").post(signupUser);
router.route("/signin").post(signInUser);
router.route("/signout").post(verifyAccessToken, signOutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
