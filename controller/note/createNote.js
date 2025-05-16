import Note from "../../models/note.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";

const createNote = asyncHandler(async (req, res) => {
  // Get data from frontend
  // validation
  // create a note and save it into db
  // resturn response

  const { title, content, category } = req.body;

  if (!content?.trim() && !title?.trim()) {
    throw new ApiError(400, "Note content is required");
  }

  // using middleware - auth.middleware.js
  const user = req.user;

  const note = await Note.create({
    title,
    content,
    category,
    userId: user?._id,
  });

  if (!note) {
    throw new ApiError(500, "Internal server error");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, note, "Note created successfully"));
});

export default createNote;
