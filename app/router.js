import Vue from 'vue';
import Router from 'vue-router';

import Home from './components/Home.vue';
import Character from './components/Character.vue';
import Map from './components/Map.vue';
import Chapter from './components/Chapter.vue';
import Death from './components/Death.vue';
import Description from './components/Description.vue';
import Win from './components/Win.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/character',
      component: Character,
    },
    {
      path: '/map',
      component: Map,
    },
    {
      path: '/chapter/:id',
      component: Chapter,
    },
    {
      path: '/die',
      component: Death,
    },
    {
      path: '/description/:id',
      component: Description,
    },
    {
      path: '/win',
      component: Win,
    },
    // Ne rien mettre en dessous
    {
      path: '*',
      redirect: { name: 'home' },
    },
  ],
});

export default router;
