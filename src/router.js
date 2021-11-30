import { createWebHistory, createRouter } from 'vue-router';
import main from './view/index.vue'

const routes = [
    {
      path: '/',
      name: 'App',
      component: main
    }
  ];

  export const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;