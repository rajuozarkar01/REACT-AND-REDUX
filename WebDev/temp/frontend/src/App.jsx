import React, { useState } from "react";
import Header from "./components/Header";
import UserList from "./components/UserList";
import AddUserForm from "./components/AddUserForm";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleUserAdded = () => {
    setRefresh((prev) => !prev); // Trigger UserList update
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        <AddUserForm onUserAdded={handleUserAdded} />
        <UserList refresh={refresh} />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
