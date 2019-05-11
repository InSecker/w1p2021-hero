<template>
  <div class="big-header">
    <h2>Choix du personnage</h2>
    <br />
    <br />
    <br />

    <Character 
      v-for="character in characters"
      v-bind:character="character"
    ></Character>

    <br />
    <br />
    <br />
    <router-link class="button" to="/home">Go to home</router-link>
  </div>
</template>

<script>
import Character from './Character.vue';

export default {
  data: function() {
    return  {
      characters: [
        {
          name: 'Bernard Sushi',
          speciality: 'Dyslexie'
        },
        {
          name: 'InSecker',
          speciality: 'Code Master'
        }
      ]
    }
  },
  components: {
    Character
  }
};
</script>
