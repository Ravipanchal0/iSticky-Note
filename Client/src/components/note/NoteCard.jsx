import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Note from "./Note.jsx";

import {
  useDeleteNoteMutation,
  useCompleteNoteMutation,
  useAddFavNoteMutation,
} from "../../store/authApiSlice.js";

import {
  deleteNote as deleteNoteAction,
  toggleComplete,
  toggleStar,
} from "../../store/noteSlice.js";

import {
  FaRegStar,
  FaStar,
  FaRegEdit,
  RiDeleteBinLine,
  FaRegBookmark,
  FaBookmark,
} from "../../assets/icons.js";

const NoteCard = (note) => {
  const { title, category, content, isStarred, isCompleted, createdAt } =
    note.note;
  const [showFullNote, setShowFullNote] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleteNote] = useDeleteNoteMutation();
  const [addFavNote] = useAddFavNoteMutation();
  const [completeNote] = useCompleteNoteMutation();

  const handleAddFavNote = async () => {
    try {
      await addFavNote(note.note?._id);
      dispatch(toggleStar(note.note?._id));
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };
  const handleIsCompleted = async () => {
    try {
      await completeNote(note.note?._id);
      dispatch(toggleComplete(note.note?._id));
    } catch (error) {
      console.error("Error marking note as completed:", error);
    }
  };

  const handleEditNote = async () => {
    navigate(`/note/${note.note._id}`);
  };

  const handleDeleteNote = async () => {
    try {
      await deleteNote(note.note?._id);
      dispatch(deleteNoteAction(note.note?._id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <>
      <div className="note-card bg-gray-200/40 px-4 py-3 rounded-lg h-full flex flex-col justify-between shadow-sm">
        <div className="card-content">
          <div className="title flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-lg -mb-1">
                {title.charAt(0).toUpperCase() + title.slice(1)}
              </h2>
              <p
                title="Category"
                className="category text-sm bg-slate-300 rounded px-2"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </p>
            </div>
            <div className="favorite">
              {isStarred ? (
                <FaStar
                  title="Favorite"
                  className="text-yellow-500 text-xl cursor-pointer hover:text-gray-500"
                  onClick={handleAddFavNote}
                />
              ) : (
                <FaRegStar
                  title="Favorite"
                  className="text-gray-500 hover:text-yellow-500 text-xl cursor-pointer"
                  onClick={handleAddFavNote}
                />
              )}
            </div>
          </div>
          <p className="time text-xs text-gray-600 mb-0.5 ml-1">
            {createdAt.split("T")[0]}
          </p>
          <p className="content ml-1">
            {content?.length > 80 ? (
              <>
                {content.slice(0, 80)}
                <button
                  className="text-blue-500 ml-1 underline cursor-pointer text-sm"
                  onClick={() => setShowFullNote(true)}
                >
                  ...see more
                </button>
              </>
            ) : (
              content
            )}
          </p>
        </div>

        <div className="actions flex justify-between items-center mt-3">
          <div className="left">
            <div className="mark-as-completed">
              {isCompleted ? (
                <FaBookmark
                  title="Mark as Completed"
                  className="text-green-600 text-lg cursor-pointer hover:text-gray-500"
                  onClick={handleIsCompleted}
                />
              ) : (
                <FaRegBookmark
                  title="Mark as Completed"
                  className="text-gray-500 text-lg cursor-pointer hover:text-green-600"
                  onClick={handleIsCompleted}
                />
              )}
            </div>
          </div>
          <div className="right gap-4 flex items-center">
            <button>
              <FaRegEdit
                title="Edit Note"
                className="edit text-gray-500 text-xl hover:cursor-pointer hover:text-blue-600"
                onClick={handleEditNote}
              />
            </button>
            <button>
              <RiDeleteBinLine
                title="Delete Note"
                className="delete text-gray-500 text-xl hover:cursor-pointer hover:text-red-600"
                onClick={handleDeleteNote}
              />
            </button>
          </div>
        </div>
      </div>
      {showFullNote && (
        <Note
          title={title}
          content={content}
          category={category}
          createdAt={createdAt}
          isStarred={isStarred}
          onClose={() => setShowFullNote(false)}
        />
      )}
    </>
  );
};

export default NoteCard;
