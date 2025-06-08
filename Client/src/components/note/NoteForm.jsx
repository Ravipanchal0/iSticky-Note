import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../../store/noteSlice.js";

import Button from "../utilities/Button";
import {
  useCreateNoteMutation,
  useEditNoteMutation,
} from "../../store/authApiSlice.js";

const NoteForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const isEditing = Boolean(id);
  const { notes } = useSelector((state) => state.note);

  const [error, setError] = useState("");
  const [noteData, setNoteData] = useState({
    title: "",
    category: "personal",
    content: "",
  });

  const [createNote] = useCreateNoteMutation();
  const [editNote] = useEditNoteMutation();

  const handleChange = (e) => {
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isEditing) {
      const noteToEdit = notes.find((note) => note._id === id);
      if (noteToEdit) {
        setNoteData({
          title: noteToEdit.title,
          category: noteToEdit.category,
          content: noteToEdit.content,
        });
      }
    }
  }, [id, isEditing, notes]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isEditing) {
        const response = await editNote({ _id: id, ...noteData }).unwrap();
        if (response) {
          navigate("/notes");
        }
      } else {
        const response = await createNote(noteData).unwrap();
        if (response) {
          dispatch(addNote(response.data));
          navigate("/notes");
        }
      }
    } catch (err) {
      console.log(err);
      setError(err.data.message);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="container z-10 w-2xl shadow bg-gray-100 p-5 rounded-lg border border-gray-300">
        <div className="header text-center relative">
          <h2 className="text-slate-800 text-2xl font-bold underline underline-offset-2 mb-2">
            iSticky Notes
          </h2>
          <p className=" w-full text-slate-700 text-lg mb-5 tracking-wider">
            What's on your mind today?
          </p>
        </div>
        <div className="error w-full my-4 text-center">
          <p className=" text-red-600 text-sm">{error}</p>
        </div>
        <form onSubmit={handleAddNote} className="form flex flex-col gap-5">
          <div className="title">
            <label className="inline-block mb-1 pl-1" htmlFor="title">
              Title :
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="px-3 py-2 rounded bg-white text-black outline-none focus:bg-gray-100/70 duration-200 border border-gray-200 focus:border-gray-300 w-full"
              value={noteData.title}
              onChange={handleChange}
            />
          </div>
          <div className="category">
            <label className="inline-block mb-1 pl-1" htmlFor="category">
              Category :
            </label>
            <select
              name="category"
              id="category"
              value={noteData.category}
              onChange={handleChange}
              className="px-3 py-2 rounded bg-white text-black outline-none focus:bg-gray-100/70 duration-200 border border-gray-200 focus:border-gray-300 w-full"
            >
              {[
                "personal",
                "work",
                "study",
                "shopping",
                "ideas",
                "reminders",
                "health",
                "travel",
                "finance",
              ].map((category) => (
                <option key={category} value={category} className="text-black">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="content">
            <label className="inline-block mb-1 pl-1" htmlFor="content">
              Note or idea :
            </label>
            <textarea
              style={{ resize: "none" }}
              name="content"
              id="content"
              rows={6}
              value={noteData.content}
              onChange={handleChange}
              className="px-3 py-2 rounded bg-white text-black outline-none focus:bg-gray-100/70 duration-200 border border-gray-200 focus:border-gray-300 w-full"
            ></textarea>
          </div>
          <Button
            type="submit"
            children={isEditing ? "Update Note" : "Add Note"}
            bgColor="bg-slate-700"
            className="w-full cursor-pointer hover:bg-slate-800 duration-200 font-semibold tracking-wider"
          />
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
