import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Board from '@/views/Board.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Board,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    }
  ],
});

export default router;
