<template>
  <div class="project-background grey px-0 container" fluid>
    <div class="py-3 justify-content-center container">
      <h3 class="text-black">Hierarchical Data</h3>
    </div>
    <div class="project-main container-fluid">
      <div class="py-2 gray-text-light container">
        <p>Hierarchy example</p>
      </div>
      <div class="row pt-4">
        <div class="col">
          <circle-pack-chart />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import CirclePackChart from './CirclePackChart'

export default {
  name: 'HierarchyExample',
  components: { CirclePackChart },
  data () {
    return {
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
  @import '@/styles/theming';

  .project-background {
    min-width: 100vw;
  }

  .project-main {
    min-height: 100vh;
    width: 100%;
  }

</style>
