<template>
  <div id="app" class="p-0">
    <div id="nav" class="p-0 pt-1">
      <div class="container-fluid p-0">
        <div class="row mx-0">
          <div class="col col-sm-4">
            <img :src="LogoSource" alt="D3 logo" class="logo"/>
          </div>

          <div class="col col-sm-7">
            <ul class="nav p-2">
              <li class="nav-item">
                <router-link class="nav-link active" to="/">Home</router-link>
              </li>
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Projects</a>
              <div class="dropdown-menu">
                <router-link class="dropdown-item" to="/projects/one">Project 1</router-link>
                <router-link class="dropdown-item" to="/projects/two">Project 2</router-link>
                <router-link class="dropdown-item" to="/projects/hierarchy">Home</router-link>
                <router-link class="dropdown-item" to="/projects/three">Project 3</router-link>
              </div>
            </ul>
          </div>
        </div>
        <router-view/>
      </div>
    </div>

  </div>
</template>

<script>
import Logo from './assets/d3.png'

export default {
  name: 'App',
  computed: {
    LogoSource () {
      return Logo
    }
  }
}
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
