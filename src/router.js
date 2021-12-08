import { createWebHistory, createRouter } from 'vue-router';
import main from './view/index.vue'
import see_more_cpu from './view/see_more_cpu'
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
    }
  ];

  export const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;