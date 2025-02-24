import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserList = ({ refresh }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
        console.log('Fetched users response:', res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
        toast.error('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refresh]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User List</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
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
              <button className="bg-red-500 text-white px-3 py-1 rounded">
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
