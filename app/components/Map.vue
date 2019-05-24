<template>
  <div class="big-header">
    <div class="main">

      <div class="rules">
        <h1>Votre quête, si vous l'acceptez!</h1>
        <p>{{ rules }}</p>

        <div class="buttons">
          <button class="button" @click="handleClick()">Choisir le chemin</button>
          <button class="button" @click="handleStart()">Lancer l'aventure</button>
        </div>
      </div>

      <InterestPoint
        v-for="(interestPoint, index) in interestPoints"
        :key="index"
        :interestPoint="interestPoint"
        :choice="choice"
        @order="handleOrder"
        @description="handleDescription"
      ></InterestPoint>
      <DarkMode></DarkMode>
    </div>

    <img 
    src="../assets/imgs/map.svg" 
    alt="Carte de jeu"
    class="map"/>

  </div>
</template>

<style lang="scss" scoped>
.rules {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 28%;
  background: black;
  padding: 15px;
  border-radius: 10px;
  h1 {
    text-align: center;
    color: white;
  }
  p {
    color: white;
    font-size: 18px;
    text-align: left;
    margin: 20px 0;
    line-height: 1.5;
  }
}

.button:hover {
  background: rgb(50, 50, 50);
  color: white;
  z-index: 1;
  width: 45%;
}


.Lac_de_glace {
  position: absolute;
  bottom: 15%;
  left: 40%;
}

.Village_de_marchands {
  position: absolute;
  bottom: 30%;
  left: 20%;
}

.Port {
  position: absolute;
  top: 45%;
  right: 35%;
}

.Forêt_Magique {
  position: absolute;
  top: 40%;
  left: 32%;
}

.Cascade {
  position: absolute;
  top: 5%;
  right: 38%;
}

.Grotte {
  position: absolute;
  bottom: 27%;
  right: 26%;
}

.Volcan {
  position: absolute;
  bottom: 25%;
  left: 46%; 
}

.Château {
  position: absolute;
  top: 35%;
  right: 22%;
}

.Spawn {
  position: absolute;
  bottom: 35%;
  right: 8%;
}

.Labyrinthe {
  position: absolute;
  bottom: 7%;
  right: 26%;
}

h1 {
  color: black;
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
import DarkMode from './DarkMode'
import InterestPoint  from './InterestPoint.vue';
import chapterService from '../services/chapterService';
import orderService from '../services/orderService';
import json from '../data.json';

var interestPoints = [];

interestPoints = [
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
    name: 'Château',
    order: 'Final'
  }
)

var orderValues = [1,2,3,4,5,6,7,8]

export default {
  data: function() {
    return  {
      interestPoints,
      choice: false,
      interestPoint: null,
      name: null,
      rules : json.rules
    }
  },
  components: {
    InterestPoint, DarkMode
  },
  methods: {
    handleStart() {
      if (orderService.length() == 0) {
        console.log('okay')
        console.log(chapterService.length())
        //chapterService.addChapter('test')
        while (chapterService.length() < 8) {
          this.interestPoints.forEach(point => {
            if (point.name !== "Spawn" && point.name!== "Château") {
              let chapterNumber = chapterService.length();
              if (point.order == chapterNumber+1) {
                chapterService.addChapter(point.name);
              }
              console.log(chapterService.length());
            }
          });
        }
        localStorage.chapters = JSON.stringify(chapterService.value());
        this.$router.push('/chapter/1');
      }
    },
    handleClick() {
      // toggle chapter choice
      this.choice = !this.choice;
    },
    handleDescription(name) {
      console.log(json.chapters[name].id)
      this.name = name;
      let nextRoute = '/description/' + json.chapters[name].id;
      this.$router.push(nextRoute)
    },
    handleOrder(name, order) {

      const interestPoint = this.interestPoints.find(point => point.name === name);

      if (interestPoint.name !== "Spawn" && interestPoint.name !== "Château") {

        if (interestPoint.order === "?") {

          interestPoint.order = order;
          orderService.splice();

        } else {

          orderService.push(interestPoint.order)
          interestPoint.order = "?";
          //orderService.decrement();
          
        }

      }

    },
  }
};

</script>
