import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/users", // Adjust if your backend runs on a different port
});

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await API.post("/login", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
