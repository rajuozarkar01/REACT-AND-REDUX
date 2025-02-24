import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loader2, UserX } from 'lucide-react';

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

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      toast.success('User deleted successfully!');
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error('Failed to delete user.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User List</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
        </div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-500">
          <UserX className="w-12 h-12 mx-auto mb-2" />
          <p>No users found. Add a user above! 👆</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user._id}
              className="p-4 bg-white rounded shadow-md flex justify-between items-center hover:shadow-lg transition"
            >
              <span className="text-lg font-medium">
                {user.name} ({user.email})
              </span>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                onClick={() => handleDelete(user._id)}
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
