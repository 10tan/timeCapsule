import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Userphotos from "./Dashboard/user-photos";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./pages/css/style.css";
import { ThemeProvider } from "./context/ThemeContext";

// Internal Pages
import Dashboard from './Dashboard/Main';
import FileUploader from './Dashboard/FileUploader';
import Profile from './Dashboard/Profile';
import Settings from './Dashboard/settings';
import F2 from './Dashboard/f2';

// Authentication
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/upload" element={<FileUploader />} />
              <Route path="/user-photos" element={<Userphotos />} />
              <Route path="/f2" element={<F2 />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
