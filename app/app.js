import './assets/scss/styles.scss';
import Vue from 'vue';
import router from './router';
import VueAnalytics from 'vue-analytics'

new Vue({ router: router }).$mount('#root');

Vue.use(VueAnalytics, {
  id: 'UA-133491732-2'
});

