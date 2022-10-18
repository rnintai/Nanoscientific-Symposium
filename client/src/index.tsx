import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { AlarmProvider } from "./context/navBarMarkContext";
import App from "./App";
import "./css/reset.css";
import "./css/quill.css";
import "../public/sitemaps/sitemap.xml";
import "../public/sitemaps/sitemap-kr.xml";
import "../public/sitemaps/sitemap-jp.xml";
import "../public/sitemaps/sitemap-eu.xml";
import "../public/sitemaps/sitemap-americas.xml";
import "../public/sitemaps/sitemap-asia.xml";

import "../public/robots.txt";
// import "./css/main-style.css";
// import "./css/custom-frontend.css";

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ThemeProvider>
      <AlarmProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AlarmProvider>
    </ThemeProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root"),
);
