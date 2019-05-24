<template>
  <div class="description">
    
    <article class="article">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <button class='button_black' @click="handleClick"> Retourner à la map</button>
      <DarkMode></DarkMode>
      
    </article>
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

article {
  display: block;
  text-align: center;
  z-index: 1;
  background: rgba(255,255,255,0.9);
  h1 {
    font-size: 30px;
    margin: 10px;
  }
  p {
    font-size: 18px;
    margin-bottom: 30px;
    text-align:  left;
    line-height: 1.5;
  }
  width: 40%;
  margin: 40px auto;
  border: 7px solid black ;
  border-radius: 10px;
  padding: 20px;
}

.button_black:hover {
  color: black;
  background: white;
  
}


</style>

<script>
import DarkMode from './DarkMode'
import json from '../data.json';


export default {
  data: function() {
    return {
      title: null,
      description: null
    }
  },
  props: ['name'],
  beforeMount() {
    let id = this.$route.path.replace('/description/', '')
    for (var chapter in json.chapters) {
      let chapterObj = json.chapters[chapter];
      if (chapterObj.id == id) {
        console.log(chapterObj)
        this.title = chapterObj.title;
        this.description = chapterObj.detail
      }
    }
  },
  methods: {
    handleClick() {
      this.$router.push('/map');
    }
  },   
  components: {
    DarkMode,
  }
}
</script>
