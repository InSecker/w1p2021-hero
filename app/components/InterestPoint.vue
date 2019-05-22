<template>
  <article :class="interestPoint.name.replace(/ /g, '_')" @click="handleClick()">
    <h2>{{ interestPoint.name }}</h2>
    <h3>Chapitre {{ interestPoint.order }}</h3>
  </article>
</template>

<style scoped>
article {
  background: rgba(255,255,255,0.8);
  border: 1px solid black ;
  border-radius: 5px;
  color: black;
  font-size: 18px;
  padding: 10px 10px;
  text-align: center;
  width: 200px;
  margin-bottom: 10px;
  transition: all 0.5s ease;
}

article:hover {
  color: white;
  background: black;

}

h3 {
  padding-top: 5px;
}
</style>


<script>
import orderService from '../services/orderService';
import Map  from './Map.vue';

export default {
  props: ['interestPoint', 'choice'],
  methods: {
    handleClick() {
      if (this.choice) {
        const order = orderService.value();
        this.$emit('order', this.interestPoint.name, order);
      } else {
        this.$emit('description', this.interestPoint.name);
      }
    }
  }
};
</script>