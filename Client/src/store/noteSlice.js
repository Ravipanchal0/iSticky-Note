import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  favNotes: [],
  categories: null,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
      state.favNotes = action.payload?.filter(
        (note) => note?.isStarred === true
      );
      state.categories = Array.from(
        new Set(action.payload?.map((note) => note.category))
      );
    },
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note._id !== action.payload);
      state.favNotes = state.favNotes.filter(
        (note) => note._id !== action.payload
      );
    },
    toggleStar: (state, action) => {
      state.notes = state.notes.map((note) =>
        note._id === action.payload
          ? { ...note, isStarred: !note.isStarred }
          : note
      );
      // Recalculate favorites
      state.favNotes = state.notes.filter((note) => note.isStarred);
    },
    toggleComplete: (state, action) => {
      state.notes = state.notes.map((note) =>
        note._id === action.payload
          ? { ...note, isCompleted: !note.isCompleted }
          : note
      );
    },
  },
});

export const { setNotes, addNote, deleteNote, toggleStar, toggleComplete } =
  noteSlice.actions;
export default noteSlice.reducer;
