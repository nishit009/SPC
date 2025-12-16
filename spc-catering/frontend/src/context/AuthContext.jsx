// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("spc_user");
    if (data) setUser(JSON.parse(data));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("spc_user", JSON.stringify(userData));
    localStorage.setItem("spc_token", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("spc_user");
    localStorage.removeItem("spc_token");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
