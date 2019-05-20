<template>
  <div class="big-header">
    <div class="main">
      <h1>Carte</h1>

      <InterestPoint
        v-for="(interestPoint, index) in interestPoints"
        :key="index"
        :interestPoint="interestPoint"
        :choice="choice"
        @order="handleOrder"
      ></InterestPoint>

      <div class="buttons">
        <button class="button" @click="handleClick()">Choisir le chemin</button>
        <button class="button" @click="handleStart()">Lancer l'aventure</button>
      </div>
    </div>

    <img 
    src="../assets/imgs/map.svg" 
    alt="Carte de jeu"
    class="map"/>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  color: black;
}

.buttons {
  position: absolute;
  top: 10px;
  left: 10px;
  .button  {
    color: white;
    text-decoration: none;
    background: black;
    padding: 10px;
    border-radius: 5px;
    display: inline-block;
    border: none;
    font-size: 20px;
    margin: 10px 0;
  }
}

.main {
  z-index: 1;
  text-align: center;
}

.map {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>

<script>
import InterestPoint  from './InterestPoint.vue';
import chapterService from '../services/chapterService';
import orderService from '../services/orderService';
import json from '../data.json';

var interestPoints = [
  {
    name: 'Spawn',
    order: 'Introduction'
  },
]

for (var chapter in json.chapters) {
  interestPoints.push(
    {
      name: chapter,
      order: '?'
    }
  )
};

interestPoints.push(
  {
    name: 'Donjon',
    order: 'Final'
  }
)

console.log(interestPoints);

export default {
  data: function() {
    return  {
      interestPoints,
      choice: false
    }
  },
  components: {
    InterestPoint
  },
  methods: {
    handleStart() {
      this.$router.push('/chapter/1');
    },
    handleClick() {
      // toggle chapter choice
      this.choice = !this.choice;
    },
    handleOrder(name, order) {

      const interestPoint = this.interestPoints.find(point => point.name === name);

      if (interestPoint.name !== "Spawn" && interestPoint.name !== "Donjon") {

        if (interestPoint.order === "?") {

          interestPoint.order = order;
          //console.log(name, order);
          chapterService.addChapter(name);
          orderService.increment();

        } else {

          interestPoint.order = "?";
          orderService.decrement();
          
        }

      }

    },
  }
};

</script>
