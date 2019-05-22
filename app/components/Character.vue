<template>
  <div id="app">
    <h1>Hello World</h1>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style lang="scss" scoped>
body{
  background: white;
}

</style>

<script>

// canvas.width = 1000;
// canvas.height = 1000

// ctx.fillStyle = "black"
// ctx.rect(0, 0, 1000, 1000);


export default {
  mounted() {
    var 
      canvas = this.$refs.canvas,
      ctx = canvas.getContext('2d');

    canvas.width = 1000;
    canvas.height = 1000;

    ctx.fillStyle
  }
}
</script>
