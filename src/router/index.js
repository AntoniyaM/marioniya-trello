import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Board from '@/views/Board.vue';
import TaskAdd from '@/components/TaskAdd.vue';
import TaskEdit from '@/components/TaskEdit.vue';

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
          component: TaskEdit,
        },
        {
          path: 'task/add',
          name: 'new-task',
          component: TaskAdd,
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
