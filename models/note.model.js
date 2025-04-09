import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "bg-purple-500",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: [
        "personal",
        "work",
        "study",
        "shopping",
        "ideas",
        "reminders",
        "health",
        "travel",
        "finance",
      ],
      default: "personal",
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
