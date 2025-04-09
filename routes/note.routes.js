import express from "express";
import verifyAccessToken from "../middlewares/auth.middleware.js";
import createNote from "../controller/note/createNote.js";
import getAllNoteOfUser from "../controller/note/getAllNotes.js";
import updateNote from "../controller/note/updateNote.js";
import getNoteByCategory from "../controller/note/getNoteByCategory.js";

const router = express.Router();

router.route("/add-note").post(verifyAccessToken, createNote);
router.route("/get-note").get(verifyAccessToken, getAllNoteOfUser);
router.route("/update-note").put(updateNote);
router.route("/by-category").get(verifyAccessToken, getNoteByCategory);

export default router;
