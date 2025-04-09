import express from "express";
import verifyAccessToken from "../middlewares/auth.middleware.js";
import createNote from "../controller/note/createNote.js";
import getAllNoteOfUser from "../controller/note/getAllNotes.js";
import updateNote from "../controller/note/updateNote.js";

const router = express.Router();

router.route("/add-note").post(verifyAccessToken, createNote);
router.route("/get-note").get(verifyAccessToken, getAllNoteOfUser);
router.route("/update-note").put(updateNote);

export default router;
