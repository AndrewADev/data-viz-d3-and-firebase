<template>
  <b-container class="project-background grey px-0" fluid>
    <title>Ninja Corp!</title>
    <b-container class="py-3 justify-content-center project-header">
      <h3 class="text-white">Ninja Corp</h3>
    </b-container>
    <b-container class="py-3 mx-0  project-subtitle">
        <p class="text-grey">The Number ONE Ninja Company</p>
        <b-button pill v-b-modal.add-employee-modal class="add-button">+</b-button>
    </b-container>
    <add-employee-modal id="add-employee-modal" />
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

import AddEmployeeModal from './AddEmployeeModal'
import OrganizationDiagram from './OrganizationDiagram'

export default {
  name: 'ProjectThree',
  components: { AddEmployeeModal, OrganizationDiagram },
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
  @import './styles';

  @mixin full-width {
    min-width: 100vw;
  }

  .add-button {
    position: relative;
    top: -0.5rem;
    left: 40vw;
  }

  .project-background {
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
    background-color: #fbfbfb;
    min-height: 100vh;
    width: 100%;
  }

</style>
