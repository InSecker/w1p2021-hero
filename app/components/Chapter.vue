<template>
  <div>
    <div class="description">

      <article class="content">
              <h1>{{ title }}</h1>
      <br />
        <p
          v-for="paragraphe in content"
          :key="paragraphe"
        >{{paragraphe}}</p>
      <br>
      <button class="button_black" @click="handleClick">Suivant</button>
      </article>


      <div class="hud">
        <section>
          <ul class="inventory">
            <h2>Inventaire</h2>
            <Item
            v-for="(item, index) in items"
            :key="index"
            :item="item"
            ></Item>
          </ul>
        </section>

        <section class="life">
          <h2>Vie: {{ life }}</h2>
        </section>
      </div>
      <DarkMode class="test"></DarkMode>
    </div>

    <img class="chapterBackground" v-if="title === 'Lac de glace'" src="../assets/imgs/lacdeglace.svg"/>
    <img class="chapterBackground" v-if="title === 'Village de marchands'" src="../assets/imgs/village-marchand_map.svg"/>
    <img class="chapterBackground" v-if="title === 'Port'" src="../assets/imgs/lac.svg"/>
    <img class="chapterBackground" v-if="title === 'Forêt Magique'" src="../assets/imgs/forêt.svg"/>
    <img class="chapterBackground" v-if="title === 'Cascade'" src="../assets/imgs/cascade_map.svg"/>
    <img class="chapterBackground" v-if="title === 'Grotte'" src="../assets/imgs/grotte.svg"/>
    <img class="chapterBackground" v-if="title === 'Volcan'" src="../assets/imgs/volcan.svg"/>
    <img class="chapterBackground" v-if="title === 'Labyrinthe'" src="../assets/imgs/labyrinthe.svg"/>

  </div>
</template>

<style lang="scss" scoped>
.test {
  z-index: 1;
}


.content {
  background: rgba(255,255,255,0.9);
  color: rgb(21, 21, 21);
  padding: 20px;
  font-size: 18px;
  width: 30%;
  line-height: 1.5;
  margin-top: 10px ;
  margin-left: 65vw;
  z-index: 1;
  border: 7px solid black ;
  border-radius: 10px;
  h1 {
    text-align: center;
    font-size: 30px;
  }
  .button_black {
    width: 100%;
    transition: all 0.5 ease;
  }
  .button_black:hover {
    width: 100%;
    color: black;
    background: rgb(240,240,240);
  }
}

.hud {
  z-index: 1;
  position: absolute;
  top: 10px;
  left: 10px;
  section {
    margin-bottom: 10px;
    background: rgba(0,0,0,0.1);
    padding: 10px;
    border-radius: 10px;
    h2 {
      text-align: center;
      font-size: 30px;
    }
  }
}


</style>


<script>
import DarkMode from './DarkMode'
import chapterService from '../services/chapterService';
import inventoryService from '../services/inventoryService';
import lifeService from '../services/lifeService';
import Item from './Item.vue';
import json from '../data.json';

export default {
  data: function() {
    return {
      //title: chapterService.render(),
      title: JSON.parse(localStorage.chapters)[(parseInt(this.$route.path.replace('/chapter/', ''))-1)],
      items: null,
      content: '',
      nextView: null,
      life: lifeService.value(),
      counter: 0,
    }
  },
  props: ['chapters'],
  components: {
    Item, DarkMode
  },
  methods: {
    handleClick() {
      this.items = JSON.parse(localStorage.items)
      chapterService.nextChapter();

      // Load next chapter vue
      this.$router.push(this.nextView);

      // Rerender vue content
      this.title = chapterService.render();
      this.actions();
    },
    actions() {
      this.nextView = parseInt(this.$route.path.replace('/chapter/', '')) + 1;
      this.nextView = '/chapter/' + this.nextView;
      this.counter++;

      let current = json.chapters[this.title];

      // display intro
      this.content = [current.intro];

      // Lac de Glace
      if (current.title === "Lac de glace") {
        if (inventoryService.content().length >= 1) {
          this.content.push(current.actions.notEmptyInventory);
          this.nextView = '/die';
        } else {
          this.content.push(current.actions.emptyInventory);
          inventoryService.addItem(current.item);
        }
      }

      // Labyrinthe
      if (current.title === "Labyrinthe") {
        let found = false;

        if (inventoryService.content().includes("Carte du Labyrinthe B")) {
          this.content.push(current.actions.gotGoodMap);
          inventoryService.removeItem("Carte du Labyrinthe B");
          inventoryService.addItem("Trésor");
          found = true;
        } else if (inventoryService.content().includes("Carte du Labyrinthe A") && !found) {
          this.content.push(current.actions.gotFalseMap);
          inventoryService.removeItem("Carte du Labyrinthe A");
          this.nextView = '/die';
          found = true;
        } else if (inventoryService.content().includes("Pissenlit Magique") && !found) {
          this.content.push(current.actions.gotPlant);
          inventoryService.removeItem("Pissenlit Magique");
          inventoryService.addItem("Trésor");
          found = true;
        }

        if (!found) {
          this.nextView = '/die';
          this.content.push(current.actions.default);
        }
      }

      // Forêt Magique
      if (current.title === "Forêt Magique") {
        inventoryService.addItem(current.item);
      }

      // Village de marchands
      if (current.title === "Village de marchands") {
        let found = false;

        if (inventoryService.content().includes('Armure')) {
          this.content.push(current.actions.swapArmor);
          inventoryService.removeItem("Armure");
          inventoryService.addItem("Carte du Labyrinthe A");
          found = true;
        }
        if (inventoryService.content().includes("Pissenlit Magique")) {
          this.content.push(current.actions.swapPlant);
          inventoryService.removeItem("Pissenlit Magique");
          inventoryService.addItem("Or");
          found = true;
        }
        if (inventoryService.content().includes("Trésor")) {
          this.content.push(current.actions.swapTreasure);
          inventoryService.removeItem("Trésor");
          inventoryService.addItem("Or");
          found = true;
        }

        if (!found) {
          this.content.push(current.actions.default);
        }
      }
      
      // Port
      if (current.title === "Port") {
        if (inventoryService.content().includes('Or')) {
          this.content.push(current.actions.gotGold);
          inventoryService.removeItem('Or');
          inventoryService.addItem('Bâteau');
        } else {
          this.content.push(current.actions.default);
          this.nextView = '/die'
        }
      }

      // Grotte 
      if (current.title === "Grotte") {
        lifeService.loose();
        if (lifeService.value() < 50) {
          this.content.push(current.actions.death);
          this.nextView = '/die';
        } else {
          this.content.push(current.actions.default);
        }
        this.life = lifeService.value();
      }

      // Cascade 
      if (current.title === "Cascade") {
        if (inventoryService.content().includes('Bâteau') && inventoryService.content().includes('Pissenlit Magique')) {
          this.content.push(current.actions.boatAndPlant)
          inventoryService.removeItem('Bâteau');
          inventoryService.removeItem('Pissenlit Magique');
          inventoryService.addItem('Bâteau Volant');
        } else {
          this.content.push(current.actions.default);
        }
        inventoryService.addItem('Armure');
      }

      // Volcan
      if (current.title === 'Volcan') {
        if (inventoryService.content().includes('Bâteau Volant')) {
          this.content.push(current.actions.flyingBoat);
          inventoryService.addItem(current.item);
        } else if (lifeService.value() === 100) {
          this.content.push(current.actions.default);
          lifeService.loose();
          this.life= lifeService.value()
          inventoryService.addItem(current.item);
        } else {
          this.content.push(current.actions.death);
          lifeService.loose();
          this.life= lifeService.value()
          this.nextView = '/die';
        }
      }

      // Win
      if (this.counter === 8 && this.nextView !== '/die') {
        this.nextView = '/win';
      }

      this.items= JSON.parse(localStorage.items);
    }
  },
  beforeMount() {
    this.actions();
  }
};
</script>