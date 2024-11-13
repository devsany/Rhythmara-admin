import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to track whether the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const nav = useNavigate();

  // Check local storage for an authentication token (this could be a JWT or any other auth token)
  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (token) {
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  // Login function that sets authentication status
  const login = (token) => {
    if (token) {
      setIsAuthenticated(true);
    }
  };

  // Logout function that clears authentication status
  const logout = () => {
    setIsAuthenticated(false);
    // nav("/");
    alert("Logout Successfully");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
