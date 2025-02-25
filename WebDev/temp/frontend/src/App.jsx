import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {isLogin ? <Login /> : <Register />}

      {/* Toggle between Login and Register */}
      <p
        className="mt-4 text-blue-600 cursor-pointer"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </p>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
