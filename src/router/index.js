import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Board from '@/views/Board.vue';
import Task from '@/components/Task.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Board,
      children: [
        {
          path: 'task/:id',
          name: 'task',
          component: Task,
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    }
  ],
});

export default router;
