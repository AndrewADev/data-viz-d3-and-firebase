import HomeView from '@/views/HomeView.vue'

// Projects
import ProjectOne from '@/components/one/ProjectOne'
import ProjectTwo from '@/components/two/ProjectTwo'
import HierarchyExample from '@/components/hierarchy/HierarchyExample'
import ProjectThree from '@/components/three/ProjectThree'

export const home = {
  path: '/',
  name: 'home',
  component: HomeView
}
export const projects = [
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
