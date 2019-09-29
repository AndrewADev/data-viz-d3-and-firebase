<template>
  <b-container class="project-background grey px-0" fluid>
    <b-container class="py-3 justify-content-center">
      <h3 class="text-black">Hierarchical Data</h3>
    </b-container>
    <b-container class="project-main" fluid>
      <b-container class="py-2 gray-text-light">
        <p>Hierarchy example</p>
      </b-container>
      <b-row class="pt-4">
        <b-col>
          <circle-pack-chart />
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>

import CirclePackChart from './CirclePackChart'

export default {
  name: 'HierarchyExample',
  components: { CirclePackChart },
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

  .project-background {
    // background-color: $gray-800;
    min-width: 100vw;
  }

  .project-main {
    // background-color: $gray-900;
    min-height: 100vh;
    width: 100%;
  }

</style>
