import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import MyProvider from "./components/Mycontext.jsx";
createRoot(document.getElementById("root")).render(
  <MyProvider>
    <App />
  </MyProvider>
);
