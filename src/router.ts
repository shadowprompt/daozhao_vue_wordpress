import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/Index.vue';
import Detail from './views/Detail.vue';
import List from './components/List.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/:id',
      name: 'detail',
      component: Detail,
    },
    {
      path: '/list',
      name: 'list',
      component: List,
    },
  ],
});
