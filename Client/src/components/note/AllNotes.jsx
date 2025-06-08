import { useEffect, useState, useCallback } from "react";
import NoteCard from "./NoteCard.jsx";
import { NavLink } from "react-router-dom";
import { FaAngleRight, FaAngleLeft } from "../../assets/icons.js";
import { useSelector, useDispatch } from "react-redux";
import { setNotes } from "../../store/noteSlice.js";

import { useGetAllNotesMutation } from "../../store/authApiSlice.js";
import { Loader } from "../utilities/index.js";

const AllNotes = () => {
  const dispatch = useDispatch();
  const { notes, favNotes } = useSelector((state) => state.note);
  const [allNotes, setAllNotes] = useState([]);
  const [orderFilter, setOrderFilter] = useState("new");

  const [currentNotes, setCurrentNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const notesPerPage = 6;

  const [getAllNotes, { isLoading }] = useGetAllNotesMutation();

  const handleAllNotes = useCallback(async () => {
    const response = await getAllNotes().unwrap();
    if (response.data.notes) {
      dispatch(setNotes(response.data.notes));
      setCurrentPage(1);
    }
  }, [dispatch]);

  const handleFavNotes = useCallback(async () => {
    setAllNotes(favNotes);
    setCurrentPage(1);
  }, [favNotes]);

  useEffect(() => {
    handleAllNotes();
  }, [handleAllNotes]);

  useEffect(() => {
    setAllNotes(notes); // Always reflect updated notes here
  }, [notes]);

  useEffect(() => {
    if (notes.length > 0) {
      // Calculate start and end index of notes for current page
      const indexOfLastNote = currentPage * notesPerPage;
      const indexOfFirstNote = indexOfLastNote - notesPerPage;

      const currentPageNotes = allNotes?.slice(
        indexOfFirstNote,
        indexOfLastNote
      );
      setCurrentNotes(currentPageNotes);
      setTotalPages(Math.ceil(allNotes.length / notesPerPage));
    }
  }, [allNotes, currentPage]);

  const handleFilterByTime = (time) => {
    const sortedNotes = [...allNotes].sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      if (time === "old") {
        // Oldest first → ascending
        return dateA - dateB;
      } else if (time == "new") {
        // Newest first → descending
        return dateB - dateA;
      }
    });

    setAllNotes(sortedNotes);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleFilterByTime(orderFilter);
  }, [orderFilter]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="notes relative w-full h-full">
        {/* // Page Header */}
        <div className="page-header flex justify-between items-center">
          <div className="page-title">
            <h3 className="title text-3xl font-semibold">All Notes</h3>
            <p className="desc text-sm text-gray-600 italic">
              Your entire collection of notes is right here.
            </p>
          </div>
          <div className="addNote">
            <NavLink to="/create-note">
              <button className="addNoteBtn px-2 py-1 bg-blue-500 text-white font-semibold tracking-wider rounded shadow-md hover:bg-blue-600 transition duration-200  hover:cursor-pointer">
                + Add Note
              </button>
            </NavLink>
          </div>
        </div>

        {/* // Filter and Order by */}
        <div className="filter w-full p-4 rounded bg-white shadow flex justify-between items-center mt-4">
          <div className="category gap-x-2 flex items-center">
            <label htmlFor="category" className="">
              Filter by:
            </label>
            <button
              onClick={handleAllNotes}
              className="px-2 py-0.5 text-sm  hover:cursor-pointer text-purple-500 bg-purple-300/30 rounded"
            >
              All Notes
            </button>
            <button
              onClick={handleFavNotes}
              className="px-2 py-0.5 text-sm bg-slate-500/40 hover:cursor-pointer hover:text-pink-500 hover:bg-pink-300/30 rounded"
            >
              Favorites
            </button>
          </div>
          <div className="order-by">
            <label htmlFor="order">Order by:</label>
            <select
              id="order"
              onChange={(e) => {
                setOrderFilter(e.target.value);
                handleFilterByTime(e.target.value);
              }}
              value={orderFilter}
              className="ml-2 px-2 py-0.5 border border-slate-300 outline-none rounded"
            >
              <option value="new">Newest</option>
              <option value="old">Oldest</option>
            </select>
          </div>
        </div>

        <div className="card-container">
          {/* // Pagination */}
          <div className="pagination flex justify-end gap-x-2 mt-4 mb-2">
            <button
              onClick={() => {
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              disabled={currentPage <= 1}
              className="previous size-8 rounded bg-gray-200/60 flex items-center justify-center hover:cursor-pointer hover:bg-slate-200 transition duration-200"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={() => {
                if (currentPage < totalPages) setCurrentPage(currentPage + 1); // Update to use totalPages
              }}
              disabled={currentPage >= totalPages}
              className="next size-8 rounded bg-gray-200/60 flex items-center justify-center hover:cursor-pointer hover:bg-slate-200 transition duration-200"
            >
              <FaAngleRight />
            </button>
          </div>

          {/* // Note Cards */}
          <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {currentNotes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllNotes;
