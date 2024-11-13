import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

// Simulating an authentication status (replace with actual auth logic)

function ProtectedRoute({ children }) {
  // const isAuthenticated = false; // Set this to `true` if the user is logged in
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
