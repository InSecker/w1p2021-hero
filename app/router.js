import Vue from 'vue';
import Router from 'vue-router';

import Home from './components/Home.vue';
import Characters from './components/Characters.vue';
import Map from './components/Map.vue';
import Chapter from './components/Chapter.vue';
import Death from './components/Death.vue';

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
      path: '/characters',
      component: Characters,
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
    // Ne rien mettre en dessous
    {
      path: '*',
      redirect: { name: 'home' },
    },
  ],
});

export default router;
