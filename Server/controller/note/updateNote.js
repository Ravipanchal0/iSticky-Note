import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";
import Note from "../../models/note.model.js";

const updateNote = asyncHandler(async (req, res) => {
  // Get updated data from frontend e.g content, category
  // update note

  const { _id, title, content, category } = req.body;

  if (!content?.trim() && !title.trim()) {
    throw new ApiError(400, "Note content is required");
  }

  const updatedNote = await Note.findByIdAndUpdate(
    _id,
    {
      title,
      content,
      category,
    },
    {
      new: true,
    }
  );

  if (!updateNote) {
    throw new ApiError(404, "Note was deleted");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedNote, "Note updated successfully"));
});

export default updateNote;
