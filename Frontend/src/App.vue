<template>
  <Navbar />
  <router-view></router-view>
</template>

<script>
// import NavbarVuetify from './components/NavbarVuetify.vue';
import Navbar from './components/Navbar.vue';

export default {
  components: { Navbar }
  // components : {NavbarVuetify}
};
</script>