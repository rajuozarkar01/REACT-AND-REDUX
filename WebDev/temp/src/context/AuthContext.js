import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userData = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        setUser(userData);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const userData = JSON.parse(atob(token.split(".")[1]));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
