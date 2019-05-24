<template>
  <div class="big-header">
    <h1 class="zoomText">Path Picker</h1>
    <br />
    <button class="button_black" @click="handleClick">Commencer l'aventure</button>
    <DarkMode></DarkMode>
  </div>
</template>

<script>
import DarkMode from './DarkMode'

export default {
  components: {
    DarkMode,
  },
  methods: {
    handleClick() {
      this.$router.push('/map')
      document.location.reload(true);
    }
  },
  beforeMount() {
    localStorage.items = [];
  }
};
</script>
