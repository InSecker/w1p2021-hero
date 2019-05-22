<template>
  <div class="big-header">
    <h1>{{ title }}</h1>
    <br />
    <article class="content">
      <p
        v-for="paragraphe in content"
        :key="paragraphe"
      >{{paragraphe}}</p>
    </article>
    <br>
    <button @click="handleClick">Next</button>

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


  </div>
</template>

<style lang="scss" scoped>
.content {
  background: rgba(255,255,255,0.5);
  color: rgb(21, 21, 21);
  padding: 20px;
  font-size: 14px;
  width: 50vw;
  margin: 0 auto;
}

.hud {
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
import chapterService from '../services/chapterService';
import inventoryService from '../services/inventoryService';
import lifeService from '../services/lifeService';
import Item from './Item.vue';
import json from '../data.json';

export default {
  data: function() {
    return {
      title: chapterService.render(),
      items: inventoryService.content(),
      content: '',
      nextView: null,
      life: lifeService.value(),
      counter: 0,
    }
  },
  props: ['chapters'],
    components: {
    Item
  },
  methods: {
    handleClick() {
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
        } else if (lifeService.value >= 50) {
          this.content.push(current.actions.default);
          inventoryService.addItem(current.item);
        } else {
          this.content.push(current.actions.death);
          this.nextView = '/die';
        }
      }


      // Win
      if (this.counter === 8 && this.nextView !== '/die') {
        this.nextView = '/win';
      }

      console.log(this.counter)
    }
  },
  beforeMount() {
    //this.inventoryUpdate();
    this.actions();
  }
};
</script>