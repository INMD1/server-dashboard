import { createWebHistory, createRouter } from 'vue-router';
import main from './view/index.vue'
import see_more_cpu from './view/see_more_cpu'
import see_more_ram from './view/see_more_ram'
import see_more_network from './view/see_more_nework'
const routes = [
    {
      path: '/',
      name: 'App',
      component: main
    },
    {
      path: '/more/cpu',
      name: 'more_cpu',
      component: see_more_cpu
    },
    {
      path: '/more/ram',
      name: 'see_ram',
      component: see_more_ram
    },
    {
      path: '/more/network',
      name: 'see_network',
      component: see_more_network
    }
  ];

  export const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;