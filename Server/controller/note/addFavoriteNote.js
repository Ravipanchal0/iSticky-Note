import { ApiError, ApiResponse } from "../../utils/index.js";
import Note from "../../models/note.model.js";

const addFavoriteNote = async (req, res) => {
  const _id = req.body;

  const note = await Note.findById(_id);

  if (!note) {
    throw new ApiError(404, "Note does not exist!");
  }

  note.isStarred = !note.isStarred;
  await note.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, note, "Note is make as favorite"));
};

export default addFavoriteNote;
