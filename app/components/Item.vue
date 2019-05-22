<template>
  <li class="item">
    <h3>{{ item }}</h3>
  </li>
</template>

<style lang="scss" scoped>
  h3 {
    color: black;
    font-size: 18px;
    margin-top: 5px;
  }
</style>


<script>


export default {
  props: ['item'],
};
</script>