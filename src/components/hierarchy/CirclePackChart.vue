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

import { data } from './data'

export default {
  name: 'CirclePackChart',
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
      const stratify = d3.stratify()
        .id(d => d.name)
        .parentId(d => d.parent)

      const rootNode = stratify(data).sum(d => d.amount)

      const pack = d3.pack()
        .size([960, 700])
        .padding(5)

      const bubbleData = pack(rootNode).descendants()

      const color = d3.scaleOrdinal(['#d1c4e9', '#b39ddb', '#9575cd'])

      const nodes = this.graph.selectAll('g')
        .data(bubbleData)
        .enter()
        .append('g')
        .attr('transform', d => `translate(${d.x}, ${d.y})`)

      nodes.append('circle')
        .attr('r', d => d.r)
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .attr('fill', d => color(d.depth))

      // Filter down to leaf nodes
      nodes.filter(d => !d.children)
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.3em')
        .attr('fill', 'white')
        .style('font-size', d => d.value * 5)
        .text(d => d.data.name)
    }

  },

  mounted () {
    this.drawGraph()
  }
}
</script>

<style lang="scss" scoped>

</style>
