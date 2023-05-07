import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./bootstrap-override.scss";
import AuthenticationContext from "./shared/AuthenticationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthenticationContext>
      <App />
    </AuthenticationContext>
  </React.StrictMode>
);
