<template>
  <div class="big-header">
    <h1>Vous êtes mort</h1>
    <br />
    <router-link class="button_black" to="/home">Recommencer</router-link>
    <DarkMode></DarkMode>
</template>

<script>
import DarkMode from './DarkMode'

export default {
  components: {
    DarkMode,
  }
};
</script>
