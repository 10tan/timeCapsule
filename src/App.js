import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./Navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Userphotos from "./Dashboard/user-photos";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./pages/css/style.css";
import { ThemeProvider } from "./context/ThemeContext";

// for internal
import Dashboard from './Dashboard/Main';
import FileUploader from './Dashboard/FileUploader'
import Profile from './Dashboard/Profile'
import Settings from './Dashboard/settings'
//import UploadPage from './internal/UploadPage'; // Import the UploadPage
import 'bootstrap/dist/css/bootstrap.min.css';
// import Cursor from './Cursor'
import {setupAuthCheck} from './api/auth-check';
// import F2 from './Dashboard/FileUploader1'
// import Profile from './pages/profile'; // Import the Profile componentimport { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";


function App() {
  return (
    <ThemeProvider>
      {/* <Cursor /> */}
      <Router>
        <Routes>
          {/* <Route path="/file-uploader" element={<FileUploader />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/upload" element={<FileUploader />} />
          <Route path ="/user-photos" element = {<Userphotos />} />
          {/* <Route path ="/f2" element = {<F2 />} /> */}
        </Routes>
        {/* <ConditionalContent />  */}
      </Router>
    </ThemeProvider>
  );
}

export default App;