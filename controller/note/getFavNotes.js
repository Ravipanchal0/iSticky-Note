import Note from "../../models/note.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../../utils/index.js";

const getFavNotes = asyncHandler(async (req, res) => {
  //use middleware
  // get all notes from database with condition isStarred=true
  // resturn response
  const user = req.user;

  if (!user || !user?._id) {
    throw new ApiError(401, "Unauthorized");
  }

  const favNotes = await Note.find({ userId: user?._id, isStarred: true });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { noOfNotes: favNotes.length, favNotes },
        "Favorite notes fetched successfully"
      )
    );
});

export default getFavNotes;
