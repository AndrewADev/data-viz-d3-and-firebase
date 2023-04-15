import Router from 'vue-router'
import { home, projects } from './routes'

export default new Router({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    home,
    ...projects
  ]
})
