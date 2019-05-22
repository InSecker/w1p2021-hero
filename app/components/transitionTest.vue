<template>
  <transition name="scale">
    <article v-if="show" class="character">
      <h2>{{ character.name }}</h2>
      <h3>{{ character.speciality }}</h3>
    </article>
  </transition>
</template>

<style scoped>
  .character {
    transition: transform 2s;
  }
  .scale-enter {
    transform: scale(0) rotate(180deg);
  }

  .scale-enter-to {
    transform: scale(2) rotate(100deg);
  }

  h2 {
    font-size: 28px;
  }
</style>


<script>
export default {
  props: ['character'],
  data: function() {
    return {
      show: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.show= true
    }, 1000)
  }
};
</script>