import express from "express";
import verifyAccessToken from "../middlewares/auth.middleware.js";
import {
  createNote,
  getAllNoteOfUser,
  updateNote,
  getNoteByCategory,
  addFavoriteNote,
  completeNote,
  deleteNote,
  getFavNotes,
} from "../controller/note/index.js";

const router = express.Router();

router.route("/addNote").post(verifyAccessToken, createNote);
router.route("/getNotes").get(verifyAccessToken, getAllNoteOfUser);
router.route("/favNotes").get(verifyAccessToken, getFavNotes);
router.route("/update-note").put(updateNote);
router.route("/addFavorite").put(addFavoriteNote);
router.route("/completeNote").put(completeNote);
router.route("/delete-note").delete(deleteNote);
router.route("/by-category").get(verifyAccessToken, getNoteByCategory);

export default router;
