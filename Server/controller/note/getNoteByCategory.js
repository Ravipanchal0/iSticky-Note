import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";
import Note from "../../models/note.model.js";

const getNoteByCategory = asyncHandler(async (req, res) => {
  const { category } = req.query; //`/api/notes/by-category?category=${category}`

  if (!category) {
    category = personal;
  }

  const notes = await Note.find({ userId: req.user._id, category });

  if (!notes.length) {
    throw new ApiError(400, `No notes found for category: ${category}`);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, notes, `Notes fetched of ${category}`));
});

export default getNoteByCategory;
