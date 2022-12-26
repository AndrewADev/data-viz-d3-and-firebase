<template>
  <div id="app" class="p-0">
    <div id="nav" class="p-0 pt-1">
      <div class="container-fluid p-0">
        <div class="row mx-0">
          <div class="col col-sm-4">
            <img :src="LogoSource" alt="D3 logo" class="logo"/>
          </div>

          <div class="col col-sm-7">
            <NavItems :root-links="rootItems" dropdown-name="Projects" :dropdown-links="dropdownItems" />
          </div>
        </div>
        <router-view/>
      </div>
    </div>

  </div>
</template>

<script setup>
import Logo from '@/assets/d3.png'
import { computed } from 'vue'
import NavItems from '@/components/NavDropdown/NavItems.vue'
import { home, projects } from './router'

const LogoSource = computed(() => Logo)

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
