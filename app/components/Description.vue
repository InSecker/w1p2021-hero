<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <button class='button_black' @click="handleClick"> Retourner à la map</button>
  </div>
</template>

<style lang="scss" scoped>

div {
  display: block;
  text-align: center;
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
  margin: 20% auto;
  border: 1px solid black ;
  border-radius: 5px;
  padding: 20px;
}

.button_black:hover {
  color: black;
  background: white;
  
}
</style>

<script>
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
  }
}
</script>
