import { createWebHistory, createRouter } from 'vue-router';
import main from './view/index.vue'
import see_more_cpu from './view/see_more_cpu'
import see_more_ram from './view/see_more_ram'
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
    }
  ];

  export const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;