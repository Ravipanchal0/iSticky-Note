import Note from "../../models/note.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";

const createNote = asyncHandler(async (req, res) => {
  // Get data from frontend
  // validation
  // create a note and save it into db
  // resturn response

  const { content, color, category } = req.body;

  if (!content.trim()) {
    throw new ApiError(400, "Note content is required");
  }

  // use middleware
  const user = req.user;

  const note = await Note.create({
    content,
    color,
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
