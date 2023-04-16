import HomeView from '@/views/HomeView.vue'

// Projects
import ProjectOne from '@/components/one/ProjectOne.vue'
import ProjectTwo from '@/components/two/ProjectTwo.vue'
import HierarchyExample from '@/components/hierarchy/HierarchyExample.vue'
import ProjectThree from '@/components/three/ProjectThree.vue'

export const home = {
  path: '/',
  name: 'home',
  display: 'Home',
  component: HomeView
}
export const projects = [
  {
    path: '/projects/one',
    name: 'project-one',
    display: 'Project One',
    component: ProjectOne
  },
  {
    path: '/projects/two',
    name: 'project-two',
    display: 'Project Two',
    component: ProjectTwo
  },
  {
    path: '/projects/hierarchy',
    name: 'hierarchy',
    display: 'Hierarchy',
    component: HierarchyExample
  },
  {
    path: '/projects/three',
    name: 'project-three',
    display: 'Project Three',
    component: ProjectThree
  }
]
