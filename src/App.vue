<template>
  <div id="app" class="p-0">
    <NavBar :root-links="rootItems" dropdown-name="Projects" :dropdown-links="dropdownItems" />

    <router-view/>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { NavBar } from '@/components'
import { home, projects } from './router'

const rootItems = computed(() => {
  return [{
    path: home.path,
    name: home.display
  }]
})

const dropdownItems = computed(() => projects.map(route => {
  return {
    path: route.path,
    name: route.display
  }
}))

</script>

<style lang="scss">

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-size: cover;
  }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.b-nav-item {
        color: #42b983;
      }
    }
  }
  .logo {
    max-height: 4rem;
  }
</style>
