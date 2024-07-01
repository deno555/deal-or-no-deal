import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'NewGame',
    component: () => import('../views/NewGamePage.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('../views/GamePage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
