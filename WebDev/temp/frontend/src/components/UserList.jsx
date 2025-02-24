import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = ({ refresh }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from backend
    const fetchUsers = async () => {
      console.log("Fetching users...");
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        console.log("Fetched users response:", res.data);
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [refresh]);

  // Handle Delete User
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      console.log(`User ${userId} deleted successfully`);
      // Update UI after delete
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User List</h2>
      {users.length === 0 ? (
        <p>No users found. Add a user above! 👆</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user._id}
              className="p-4 bg-white rounded shadow-md flex justify-between items-center"
            >
              <span>
                {user.name} ({user.email})
              </span>
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
