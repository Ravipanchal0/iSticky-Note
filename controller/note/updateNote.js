import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";
import Note from "../../models/note.model.js";

const updateNote = asyncHandler(async (req, res) => {
  // Get updated data from frontend e.g content, color, category
  // update note

  const { _id, content, color, category } = req.body;

  if (!content?.trim()) {
    throw new ApiError(400, "Note content is required");
  }

  const updatedNote = await Note.findByIdAndUpdate(
    _id,
    {
      content,
      color,
      category,
    },
    {
      new: true,
    }
  );

  return res.status(200).json(new ApiResponse(200, updatedNote));
});

export default updateNote;
