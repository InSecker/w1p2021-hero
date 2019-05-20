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


    <ul class="inventory">
      <h2>Inventaire</h2>
      <Item
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      ></Item>
    </ul>
  </div>
</template>

<style lang="scss" scoped>

.inventory {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0,0,0,0.1);
  padding: 10px;
  h2 {
    text-align: center;
    padding-bottom: 5px;
  }
}

.content {
  background: rgba(255,255,255,0.5);
  color: rgb(21, 21, 21);
  padding: 20px;
  font-size: 14px;
  width: 50vw;
  margin: 0 auto;
}


</style>


<script>
import chapterService from '../services/chapterService';
import inventoryService from '../services/inventoryService'
import Item from './Item.vue';
import json from '../data.json'

export default {
  data: function() {
    return {
      title: chapterService.render(),
      items: inventoryService.content(),
      content: '',
      nextView: null
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

    }
  },
  beforeMount() {
    //this.inventoryUpdate();
    this.actions();
  }
};
</script>