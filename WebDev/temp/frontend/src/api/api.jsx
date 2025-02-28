import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5002/api/users", // Backend URL
});

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response.data || { message: "Network error" };
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await API.post("/login", userData);
    return response.data;
  } catch (error) {
    throw error.response.data || { message: "Network error" };
  }
};
