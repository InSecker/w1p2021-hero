<template>
  <div>
    <img src="../assets/imgs/torch.svg" alt="toggleDarkMode" @click="handleClick">
  </div>
  
</template>

<style scoped>
img {
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 32px;
  left: 32px;
}
</style>


<script>

export default {
  name: 'darkmode',
  data() {
    return  {
      darkmode: null,
    }
  },
  methods: {
    handleClick() {
      document.body.classList.toggle("darkmode");
      if (localStorage.darkmode === 'true') {
        localStorage.darkmode = 'false'
      } else {
        localStorage.darkmode = 'true';
      }
      
    }
  },
  beforeMount() {
    if (localStorage.darkmode) {
      this.darkmode = localStorage.darkmode;
    } else {
      localStorage.darkmode = this.darkmode;
    }
    if (this.darkmode === 'true' && !document.body.classList.contains('darkmode')) {
      document.body.classList.toggle('darkmode');
    }
  }
}

</script>

