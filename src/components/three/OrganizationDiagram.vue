<template>
  <b-container fluid>
    <div class="canvas">
      <svg class="circle-pack-chart" :width="totalWidth" :height="totalHeight">
        <g class="graph"
          :width="graphWidth"
          :height="graphHeight"
          :transform="`translate(${marginLeft}, ${marginTop})`">
        </g>
      </svg>
    </div>
  </b-container>
</template>

<script>

import * as d3 from 'd3'

export default {
  name: 'OrganizationDiagram',
  data () {
    return {
      marginTop: 50,
      marginRight: 50,
      marginBottom: 50,
      marginLeft: 50,
      db: {}
    }
  },

  props: {
    graphHeight: {
      type: Number,
      default: 700
    },
    graphWidth: {
      type: Number,
      default: 960
    }
  },

  computed: {
    totalHeight () {
      return this.graphHeight + this.marginTop + this.marginBottom
    },
    totalWidth () {
      return this.graphWidth + this.marginRight + this.marginLeft
    },
    graph () {
      return d3.select('.graph')
    }
  },

  methods: {
    drawGraph () {

    }

  },

  mounted () {
    this.drawGraph()
  }
}
</script>

<style lang="scss" scoped>

</style>
