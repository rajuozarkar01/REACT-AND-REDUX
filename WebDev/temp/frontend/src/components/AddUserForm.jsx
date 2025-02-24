import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = ({ onUserAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend
      const res = await axios.post('http://localhost:5000/api/users', {
        name,
        email,
      });

      console.log('User added:', res.data); // Debug: Log added user

      // Clear form
      setName('');
      setEmail('');

      // Notify App to refresh User List
      onUserAdded();
    } catch (error) {
      console.error('Error adding user:', error.response?.data || error.message);
      alert('Failed to add user. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add User</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;
