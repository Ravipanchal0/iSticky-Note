import Note from "../../models/note.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";

const completeNote = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  const note = await Note.findById(_id);

  if (!note) {
    throw new ApiError(404, "Note had been deleted");
  }

  note.isCompleted = !note.isCompleted;
  await note.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, "Note is mark as done"));
});

export default completeNote;
