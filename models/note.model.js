import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    content: { type: String, required: true },
    color: { type: String, default: "bg-purple-500" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
