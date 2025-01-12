import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Board from '@/views/Board.vue'

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
          component: () => import('@/components/TaskEdit.vue'),
        },
        {
          path: 'task/add',
          name: 'new-task',
          component: () => import('@/components/TaskAdd.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
})

export default router
