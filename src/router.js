import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// Projects
import ProjectOne from './components/one/ProjectOne'
import ProjectTwo from './components/two/ProjectTwo'
import HierarchyExample from './components/hierarchy/HierarchyExample'
import ProjectThree from './components/three/ProjectThree'

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
    },
    {
      path: '/projects/hierarchy',
      name: 'hierarchy',
      component: HierarchyExample
    },
    {
      path: '/projects/three',
      name: 'project-three',
      component: ProjectThree
    }
  ]
})
