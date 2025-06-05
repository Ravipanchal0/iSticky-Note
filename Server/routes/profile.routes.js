import express from "express";
import verifyAccessToken from "../middlewares/auth.middleware.js";
import {
  updateUserDetails,
  deleteAccount,
  updatePassword,
  deactivateAccount,
  activateAccount,
  currentUser,
} from "../controller/user/index.js";

const router = express.Router();

router.route("/").get(verifyAccessToken, currentUser);
router.route("/update").put(verifyAccessToken, updateUserDetails);
router.route("/update-password").put(verifyAccessToken, updatePassword);
router.route("/deactivate-account").put(verifyAccessToken, deactivateAccount);
router.route("/activate-account").put(activateAccount);
router.route("/delete-account").delete(verifyAccessToken, deleteAccount);

export default router;
