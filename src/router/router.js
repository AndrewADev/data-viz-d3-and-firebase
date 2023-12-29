import { createRouter, createWebHistory } from 'vue-router'
import { home, projects } from './routes'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    home,
    ...projects
  ]
})
