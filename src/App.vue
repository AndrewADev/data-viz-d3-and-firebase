<template>
  <div id="app" class="p-0">
    <div id="nav" class="p-0 pt-1">
      <b-container class="p-0" fluid>
        <b-row fluid>
          <b-col cols="4">
            <b-img :src="LogoSource" alt="D3 logo" fluid class="logo"/>
          </b-col>

          <b-col cols="7">
            <b-nav class="p-2">
              <b-nav-item to="/">Home</b-nav-item>
              <b-nav-item-dropdown
                text="Projects"
                >
                <b-dropdown-item
                  to="/projects/one"
                  >
                    Project 1
                  </b-dropdown-item>
                <b-dropdown-item
                  to="/projects/two"
                >
                    Project 2
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </b-nav>
          </b-col>
        </b-row>
        <router-view/>
      </b-container>
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
    // max-height: 1vh;
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
