<template>
  <div class="big-header">
    <h1 class="zoomText">Path Picker</h1>
    <br />
    <router-link class="button_black" to="/map">Commencer l'aventure</router-link>
    <DarkMode></DarkMode>
  </div>
</template>

<script>
import DarkMode from './DarkMode'

export default {
  components: {
    DarkMode,
  }
};
</script>
