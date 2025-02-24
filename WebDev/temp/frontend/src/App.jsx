import React, { useState } from "react";
import Header from "./components/Header";
import UserList from "./components/UserList";
import AddUserForm from "./components/AddUserForm";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleUserAdded = () => {
    setRefresh((prev) => !prev); // Toggle refresh to trigger UserList update
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        <AddUserForm onUserAdded={handleUserAdded} />
        <UserList refresh={refresh} />
      </div>
    </div>
  );
};

export default App;
