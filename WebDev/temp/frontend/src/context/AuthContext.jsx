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

        if (
          parsedUser &&
          parsedUser._id &&
          parsedUser.email &&
          parsedUser.role
        ) {
          setUser(parsedUser);
        } else {
          console.error("Invalid user data structure:", parsedUser);
          clearStorage();
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        clearStorage();
      }
    } else {
      setUser(null);
    }
  }, []);

  const clearStorage = () => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  };

  const login = (userData, token, rememberMe) => {
    console.log("Saving User Data:", userData);
    console.log("Saving Token:", token);

    if (userData && token && userData._id && userData.email && userData.role) {
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
    clearStorage();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
