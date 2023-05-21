import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./utils/fontawsome";
import AppRoutes from "./AppRoutes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
