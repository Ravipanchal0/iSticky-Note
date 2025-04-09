import Note from "../../models/note.model.js";
import { ApiResponse, asyncHandler } from "../../utils/index.js";

const getAllNoteOfUser = asyncHandler(async (req, res) => {
  const notes = await Note.find({ userId: req.user?._id }).sort({
    createdAt: -1,
  });

  return res.status(200).json(new ApiResponse(200, notes, "All notes fetched"));
});

export default getAllNoteOfUser;
