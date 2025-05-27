import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  favNotes: [],
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
    },
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note._id !== action.payload);
    },
  },
});

export const { setNotes, addNote, deleteNote } = noteSlice.actions;
export default noteSlice.reducer;
