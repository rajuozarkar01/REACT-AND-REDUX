import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const userData =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    console.log("Stored Token:", token);
    console.log("Stored User Data:", userData);

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);

        // ✅ Ensure user data contains required properties
        if (
          parsedUser &&
          parsedUser._id &&
          parsedUser.email &&
          parsedUser.role
        ) {
          setUser(parsedUser);
        } else {
          console.error("Invalid user data structure:", parsedUser);
          setUser(null);
          localStorage.removeItem("user");
          sessionStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
      }
    } else {
      setUser(null);
    }
  }, []);

  const login = (userData, token, rememberMe) => {
    console.log("Saving User Data:", userData);
    console.log("Saving Token:", token);

    if (userData && token) {
      if (rememberMe) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(userData));
      }
      setUser(userData);
    } else {
      console.error("Invalid login attempt: Missing userData or token");
    }
  };

  const logout = () => {
    console.log("Logging Out...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
