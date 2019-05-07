import Vue from 'vue';
import Router from 'vue-router';

import Home from './components/Home.vue';
import Phase1 from './components/Phase1.vue';
import Phase2 from './components/Phase2.vue';
import Phase3 from './components/Phase3.vue';
import Phase4 from './components/Phase4.vue';
import Phase5 from './components/Phase5.vue';
import Phase6 from './components/Phase6.vue';

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
      path: '/phase1',
      component: Phase1,
    },
    {
      path: '/phase2',
      component: Phase2,
    },
    {
      path: '/phase3',
      component: Phase3,
    },
    {
      path: '/phase4',
      component: Phase4,
    },
    {
      path: '/phase5',
      component: Phase5,
    },
    {
      path: '/phase6',
      component: Phase6,
    },
    {
      path: '*',
      redirect: { name: 'home' },
    },
  ],
});

export default router;
