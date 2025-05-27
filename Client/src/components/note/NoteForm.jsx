import React, { useState, useRef } from "react";
import Input from "../utilities/Input";
import Button from "../utilities/Button";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import noteServices from "../../controller/note.js";
import { addNote } from "../../store/noteSlice.js";

const NoteForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const title = useRef(null);
  const [noteData, setNoteData] = useState({
    category: "personal",
    content: "",
  });

  const handleChange = (e) => {
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
  };

  const handleAddNote = async () => {
    setError("");
    console.log();
    try {
      const response = await noteServices.createNote({
        title: title.current.value,
        ...noteData,
      });
      if (response.data) {
        console.log(response.data);
        dispatch(addNote(response.data));
        navigate("/allNotes");
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
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
        <div className="form flex flex-col gap-5">
          <Input label="Title : " placeholder="Enter note title" ref={title} />
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
            onClick={handleAddNote}
            children="Add Note"
            bgColor="bg-slate-700"
            className="w-full cursor-pointer hover:bg-slate-800 duration-200 font-semibold tracking-wider"
          />
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
