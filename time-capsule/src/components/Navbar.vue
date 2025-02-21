<template>
    <nav class="navbar">
      <ul>
        <li v-for="link in links" :key="link.path">
          <router-link :to="link.path" class="nav-link">{{ link.text }}</router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        links: [
          { path: "/", text: "Home" },
          { path: "/about", text: "About" },  
          { path: "/contact", text: "Contact" },
          { path: "/login", text: "Login" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Navbar Styling */
  .navbar {
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    padding: 15px 20px;
    display: flex;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  /* Remove default list styles */
  ul {
    list-style: none;
    display: flex;
    gap: 25px;
    margin: 0;
    padding: 0;
  }
  
  /* Navigation Links */
  .nav-link {
    text-decoration: none;
    color: white;
    font-size: 18px;
    font-weight: bold;
    padding: 10px 15px;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
  }
  
  /* Hover & Active Effects */
  .nav-link:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
  
  /* Active Route Styling */
  .router-link-active {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
  }
  </style>
  