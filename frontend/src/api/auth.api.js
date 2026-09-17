import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const login = async (user) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, user);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed", {
      cause: err,
    });
  }
};
export const register = async (user) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/register`, user);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Registration failed", {
      cause: err,
    });
  }
};
