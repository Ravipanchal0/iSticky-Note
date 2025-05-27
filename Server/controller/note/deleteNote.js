import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";
import Note from "../../models/note.model.js";

const deleteNote = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  if (!_id) throw new ApiError(400, "Note ID is required");

  const note = await Note.findByIdAndDelete(_id);

  if (!note) {
    throw new ApiError(404, "Note does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Note deleted successfully"));
});

export default deleteNote;
