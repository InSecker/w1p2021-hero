<template>
  <div class="big-header">
    <h1>Vous avez gagné</h1>
    <br />
    <router-link class="button_black" to="/home">Retour au menu</router-link>
    <DarkMode></DarkMode>
    <audio src="../assets/audio/win.mp3" autoplay/>
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
