import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // auth = user object or null
  const [isModelOpen, setIsModelOpen] = useState(false);

  const login = (userData) => {
    setAuth(userData);
  };

  const logout = () => {
    setAuth(null);
  };

  const toggleModel = () => {
    setIsModelOpen((prev) => !prev);
  };

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, isModelOpen, toggleModel }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
