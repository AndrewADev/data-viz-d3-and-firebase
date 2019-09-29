<template>
  <b-container class="project-background grey px-0" fluid>
    <title>Ninja Corp!</title>
    <b-container class="py-3 justify-content-center project-header">
      <h3 class="text-white">Ninja Corp</h3>
    </b-container>
    <b-container class="py-3 mx-0  project-subtitle">
        <p class="text-grey">The Number ONE Ninja Company</p>
        <b-button pill class="add-button">+</b-button>
    </b-container>
    <b-container class="project-main" fluid>
      <b-row class="pt-4">
        <b-col>
          <organization-diagram />
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>

import OrganizationDiagram from './OrganizationDiagram'

export default {
  name: 'ProjectThree',
  components: { OrganizationDiagram },
  data () {
    return {
      db: {},
      error: ''
    }
  },

  computed: {
  },

  methods: {
  }

}
</script>

<style lang="scss" scoped>
  @import 'node_modules/bootstrap/scss/bootstrap';
  @import 'node_modules/bootstrap-vue/src/index.scss';

  $darkpink: darken(hotpink, 20%);

  @mixin full-width {
    min-width: 100vw;
  }

  .add-button {
    background-color: $darkpink;
    border: 0px;
    position: relative;
    top: -0.5rem;
    left: 40vw;

    &:hover {
      background-color: hotpink;
    }
  }

  .project-background {
    // background-color: $gray-800;
    @include full-width();
  }

  .project-header {
    background-color: $darkpink;
    @include full-width();
  }

  .project-subtitle {
    background-color: $gray-300;
    @include full-width();
    max-height: 4rem;
  }

  .project-main {
    // background-color: $gray-900;
    min-height: 100vh;
    width: 100%;
  }

</style>
