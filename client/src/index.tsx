import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./css/reset.css";
import "../public/sitemaps/sitemap.xml";
import "../public/sitemaps/kr/sitemap.xml";
import "../public/robots.txt";
// import "./css/main-style.css";
// import "./css/custom-frontend.css";

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root"),
);
