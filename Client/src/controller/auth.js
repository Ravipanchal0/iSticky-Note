import axios from "axios";

class AuthServices {
  constructor() {}

  async createAccount({ fullName, email, username, password }) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        { username, fullName, email, password }
      );
      if (response.data && response.statusText == "OK") {
        return response.data;
      } else {
        return response;
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Try again.";
      throw new Error(errorMessage);
    }
  }

  async login({ loginId, password }) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { loginId, password },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Try again.";
      throw new Error(errorMessage);
    }
  }

  async logout() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      console.log("Logout successfully : ", response);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Try again.";
      throw new Error(errorMessage);
    }
  }

  async loginByAccessToken() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
        {},
        { withCredentials: true }
      );

      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data || "Something went wrong. Try again.";
      throw new Error(errorMessage);
    }
  }
}

const authServices = new AuthServices();
export default authServices;
