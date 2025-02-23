import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogoutClick = async (event) => { // Make handleLogoutClick async
    event.preventDefault();

   // try {
      //await axios.post("/api/auth/logout"); // Call the backend logout route
      localStorage.removeItem("token"); // Clear the token
      navigate("/login"); // Redirect to login
    /*} catch (error) {
      console.error("Logout error:", error);
      // Handle error (e.g., display a message to the user)
      if (error.response) {
          console.error("Logout failed:", error.response.data.message);
      } else if (error.request) {
          console.error("Network error:", error.request);
      } else {
          console.error("Error logging out:", error.message);
      }
    }*/
  };

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-primary"}`}>
      <div className="container">
        <Link className={`navbar-brand ${location.pathname === "/" ? "active border border-2 rounded" : ""}`} to="/">
          TIME
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
              <Link className={`nav-link ${location.pathname === "/dashboard" ? "active border border-2 rounded" : ""}`} to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a className={`nav-link dropdown-toggle ${darkMode ? "text-light" : "text-dark"}`} href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Profile
              </a>
              <ul className={`dropdown-menu ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`} aria-labelledby="profileDropdown">
                <li><Link className={`dropdown-item ${darkMode ? "text-light" : "text-dark"} ${location.pathname === "/profile" ? "active border border-2 rounded" : ""}`} to="/profile">View Profile</Link></li>
                <li><Link className={`dropdown-item ${darkMode ? "text-light" : "text-dark"} ${location.pathname === "/settings" ? "active border border-2 rounded" : ""}`} to="/settings">Settings</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link
                    className={`dropdown-item ${darkMode ? "text-light" : "text-dark"} ${location.pathname === "/logout" ? "active border border-2 rounded" : ""}`}
                    to="/logout" // Changed to /logout
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/upload" ? "active border border-2 rounded" : ""}`} to="/upload">
                Upload
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center ms-3">
              <label className="toggle">
                <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                <span className="slider"></span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;