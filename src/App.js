import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./pages/css/style.css";
import { ThemeProvider } from "./context/ThemeContext";

// for internal
import Dashboard from './internal/Dashboard';
//import UploadPage from './internal/UploadPage'; // Import the UploadPage
import 'bootstrap/dist/css/bootstrap.min.css';
// import Profile from './pages/profile'; // Import the Profile component

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ConditionalContent /> 
      </Router>
    </ThemeProvider>
  );
}

function ConditionalContent() {
  const location = useLocation();

  if (location.pathname === '/') {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> Profile route */}
        </Routes>
      </>
    );
  } else if (location.pathname === '/login') {
    return (
      <>
        {/* <Navbar /> You can also choose not to display Navbar here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> Profile route */}
        </Routes>
      </>
    );
  } else if (location.pathname === '/signup') {
    return (
      <>
        {/* <Navbar /> You can also choose not to display Navbar here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> Profile route */}
        </Routes>
      </>
    );
  } else if (location.pathname === '/dashboard') {
    return (
      <>
        {/* <Navbar /> You can also choose not to display Navbar here */}
          <Dashboard/>
        
      </>
    );
  } else {
    return (
      null
    );
  }
}

export default App;