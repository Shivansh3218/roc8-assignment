// src/App.js
import React from "react";
import { useCookies } from "react-cookie";
import { Routes, Route, useNavigate } from "react-router-dom"; // Import Routes and Route
import "./App.css";
import Login from "./components/Login"; // Import Login Component
import Dashboard from "./components/Dashboard"; // Import Dashboard Component
import { Navigate } from "react-router-dom"; // Add this line

function App() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [cookies] = useCookies(["authToken"]); // Check for authToken in cookies

  // Function to handle login and set auth token
  const handleLogin = () => {
    // Set authToken in cookies or local storage here if needed
    navigate("/dashboard"); // Redirect to dashboard after login
  };

  return (
    <Routes>
      {/* Define routes here */}
      <Route path="/login" element={<Login onLogin={handleLogin} />} />

      {/* Protected route for Dashboard */}
      <Route
        path="/dashboard"
        element={
          cookies.authToken ? (
            <Dashboard
              ageFilter={"15-25"}
              setAgeFilter={() => {}}
              genderFilter={"Male"}
              setGenderFilter={() => {}}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Redirect root path to login or dashboard based on authentication */}
      <Route
        path="/"
        element={<Navigate to={cookies.authToken ? "/dashboard" : "/login"} />}
      />

      {/* Handle unmatched routes */}
      <Route path="/dashboard" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
