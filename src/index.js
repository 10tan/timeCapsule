import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import App2 from './App2'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; // Import AuthProvider
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <App2 />  
  </React.StrictMode>
);
reportWebVitals();


// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./AuthContext"; // Import AuthProvider
// import reportWebVitals from "./reportWebVitals";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
//       <BrowserRouter> {/* ✅ Ensures routing works properly */}
//         <App />
//       </BrowserRouter>
//     </AuthProvider>
//   </React.StrictMode>
// );

// reportWebVitals();
