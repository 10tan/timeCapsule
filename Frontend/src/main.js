import { createApp } from 'vue';
import App from './App.vue';
import Home from './pages/Home.vue'
// import Contact from './pages/Contact.vue'
// import About from './pages/About.vue'
import Login from './pages/Login.vue'
import { createRouter, createWebHistory } from 'vue-router'; // Import router
import { createVuetify } from "vuetify";
import "vuetify/styles"; // Import Vuetify styles

const vuetify = createVuetify(); // Create Vuetify instance


// Define your routes
const routes = [
  { path: '/', component: Home }, // Home component
//   { path: '/about', component: About }, // About component
//   { path: '/contact', component: Contact }, // Contact component
  { path: '/login', component: Login }, // Login component

];

// Create the router instance
const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode (recommended)
  routes, // short for `routes: routes`
});

const app = createApp(App);
app.use(router); // Use the router
app.mount('#app');