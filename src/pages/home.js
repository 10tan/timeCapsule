import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";
import { ThemeContext } from "../context/ThemeContext"; // Import Theme Context
import "./css/home.css"; // Import Home CSS

const Home = () => {
  const { darkMode } = useContext(ThemeContext); // Get dark mode state

  return (
    <div className={`home-container ${darkMode ? "dark-mode" : ""}`}>
      {/* <Navbar /> */}
      {/* Header */}
      <header className="py-5">
        <div className="container px-5 pb-5">
          <div className="row gx-5 align-items-center">
            <div className="col-xxl-5 text-center text-xxl-start">
              <div className={`badge ${darkMode ? "bg-dark text-light" : "bg-gradient-primary-to-secondary text-white"} mb-4`}>
                <div className="text-uppercase">Store Your Memories</div>
              </div>
              <h1 className="display-3 fw-bolder mb-5">
                <span className="text-gradient d-inline">TIME CAPSULE 2.0</span>
              </h1>
              <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start">
                <Link className={`btn btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder ${darkMode ? "btn-light" : "btn-primary"}`} to="/login">
                  LOGIN
                </Link>
                <Link className={`btn btn-lg px-5 py-3 fs-6 fw-bolder ${darkMode ? "btn-outline-light" : "btn-outline-dark"}`} to="/signup">
                  SIGNUP
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className={`py-5 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-xxl-8 text-center my-5">
              <h2 className="display-5 fw-bolder">
                <span className="text-gradient d-inline">About Me</span>
              </h2>
              <p className="lead fw-light mb-4">Mera naam samay
              </p>
              <p className={darkMode ? "text-light" : "text-muted"}>  
              </p>
              <div className="d-flex justify-content-center fs-2 gap-4">
                <a className="text-gradient" href="#!"><i className="bi bi-twitter"></i></a>
                <a className="text-gradient" href="#!"><i className="bi bi-linkedin"></i></a>
                <a className="text-gradient" href="#!"><i className="bi bi-github"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-4 mt-auto ${darkMode ? "bg-dark text-light" : "bg-white text-dark"}`}>
        <div className="container px-5">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <div className="small m-0">&copy; Your Website 2023</div>
            </div>
            <div className="col-auto">
              <a className="small" href="#!">Privacy</a>
              <span className="mx-1">&middot;</span>
              <a className="small" href="#!">Terms</a>
              <span className="mx-1">&middot;</span>
              <a className="small" href="#!">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
