// src/api/userApi.js

const API_URL = "http://localhost:5000/api/users";

export const getUsers = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addUser = async (user) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to add user");
  }

  return response.json();
};
