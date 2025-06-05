import axios from "axios";

class UserServices {
  constructor() {}

  async getCurrrentUser() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
  async passwordUpdate({ oldPassword, newPassword }) {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/password-update`,
        { oldPassword, newPassword },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
      return response;
    }
  }

  async accountDeactivate() {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/deactivate-account`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
      return response;
    }
  }

  async accountActivate({ username, email, password }) {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/activate-account`,
        { username, email, password }
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
      return response;
    }
  }

  async deleteAccount() {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/user/delete-account`,
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
}

const userServices = new UserServices();
export default userServices;
