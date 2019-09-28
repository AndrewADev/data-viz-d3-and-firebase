import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// Projects
import ProjectOne from './components/one/ProjectOne'
import ProjectTwo from './components/two/ProjectTwo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/projects/one',
      name: 'project-one',
      component: ProjectOne
    },
    {
      path: '/projects/two',
      name: 'project-two',
      component: ProjectTwo
    }
  ]
})
