import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Check local storage for theme preference
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-primary"}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="sand-clock">⌛</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </li>
            {/* Dark Mode Toggle Bar */}
            <li className="nav-item d-flex align-items-center ms-3">
              <label className="toggle">
                <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                <span className="slider"></span>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <style>
        {`
          .sand-clock {
            font-size: 2rem;
            display: inline-block;
            animation: sandFlow 3s infinite ease-in-out;
            transition: transform 0.5s ease-in-out;
          }

          @keyframes sandFlow {
            0% { content: "⌛"; transform: rotate(0deg); }
            50% { content: "⏳"; transform: rotate(90deg); }
            100% { content: "⌛"; transform: rotate(180deg); }
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
