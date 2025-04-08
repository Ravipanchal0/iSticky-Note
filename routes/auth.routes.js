import express from "express";
import {
  signupUser,
  signInUser,
  signOutUser,
} from "../controller/auth/index.js";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";

const router = express.Router();

router.route("/signup").post(signupUser);
router.route("/signin").post(signInUser);
router.route("/signout").post(verifyAccessToken, signOutUser);

export default router;
