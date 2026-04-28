import React from "react";
import ReactDOM from "react-dom/client";

//for real product notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>   
    <AuthProvider>  
      <App />
      <ToastContainer position="top-right" autoClose={2000} />
    </AuthProvider>
  </BrowserRouter>
);