import axios from "axios";

class NoteServices {
  constructor() {}

  async createNote({ title, content, category }) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/note/add-note`,
        { title, content, category },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Try again.";
      throw new Error(errorMessage);
    }
  }

  async updateNote({ _id, title, content, category }) {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/note/update-note`,
        { _id, title, content, category },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Try again.";
      throw new Error(errorMessage);
    }
  }

  async markFavorite({ _id }) {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/note//addFavorite`,
        { _id }
      );

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Try again.";
      throw new Error(errorMessage);
    }
  }

  async deleteNote({ _id }) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/note/delete-note`,
        { _id }
      );

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Try again.";
      throw new Error(errorMessage);
    }
  }

  async getAllNotes() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/note/getNotes`,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Try again.";
      throw new Error(errorMessage);
    }
  }

  // async getFavoriteNotes() {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/note/favNotes`,
  //       { withCredentials: true }
  //     );

  //     return response.data;
  //   } catch (error) {
  //     const errorMessage =
  //       error.response?.data?.message || "Something went wrong, Try again.";
  //     throw new Error(errorMessage);
  //   }
  // }
}

const noteServices = new NoteServices();
export default noteServices;
