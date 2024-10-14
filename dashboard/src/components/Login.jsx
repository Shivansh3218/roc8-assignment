/* global google */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import Cookies from "js-cookie"; // Import js-cookie

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(); // Call parent function to update logged-in state
  };

  const handleCallbackResponse = async (response) => {
    let jwtToken = response.credential;

    // Decode the JWT token
    try {
      const decodedToken = jwtDecode(jwtToken);
      // Store the token in cookies
      Cookies.set("authToken", jwtToken, { expires: 7 }); // Expires in 7 days
      onLogin(); // Pass decoded token to parent function
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);

    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  useEffect(() => {
    google?.accounts.id.initialize({
      client_id:
        "377491839694-.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google?.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      width: 250,
      size: "large",
    });
  }, []);

  return (
    <div
      className="main-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        width: "20vw",
      }}
    >
      <div id="login-container">
        <h2 id="learn-heading">
          Sign In to view our Product Analytics Platform
        </h2>
        <div id="signInDiv" className="custom-google-button"></div>
      </div>
    </div>
  );
};

export default Login;
