// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
    <CookiesProvider>
      <BrowserRouter>
        {" "}
        {/* Wrap App with BrowserRouter */}
        <App />
      </BrowserRouter>
    </CookiesProvider>,
  document.getElementById("root")
);
