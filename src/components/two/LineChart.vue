<template>
  <b-container fluid>
    <div class="canvas">
      <svg class="line-chart" :width="totalWidth" :height="totalHeight">
        <g class="graph"
          :width="graphWidth"
          :height="graphHeight"
          :transform="`translate(${marginLeft}, ${marginTop})`">
          <g class="x-axis" :transform="`translate(0, ${graphHeight})`"/>
          <g class="y-axis"/>
        </g>
      </svg>
    </div>
  </b-container>
</template>

<script>

import * as d3 from 'd3'

import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  name: 'LineChart',
  data () {
    return {
      marginTop: 40,
      marginRight: 20,
      marginBottom: 50,
      marginLeft: 50,
      db: {}
    }
  },

  props: {
    graphHeight: {
      type: Number,
      default: 310
    },
    graphWidth: {
      type: Number,
      default: 490
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
    },
    xScale () {
      return d3.scaleTime().range([0, this.graphWidth])
    },

    yScale () {
      return d3.scaleLinear().range([this.graphHeight, 0])
    }
  },

  methods: {
    drawGraph () {
    },

    update (chartData) {
      const { xScale, yScale } = this

      xScale.domain(d3.extent(chartData, d => new Date(d.date)))
      yScale.domain([0, d3.max(chartData, d => d.distance)])

      // Create circles for objects
      const circles = this.graph.selectAll('circle')
        .data(chartData)

      // remove unwanted points
      circles.exit().remove()

      // update current points
      circles.attr('r', 4)
        .attr('cx', d => xScale(new Date(d.date)))
        .attr('cy', d => yScale(new Date(d.distance)))
        .attr('fill', '#ccc')

      // add new points
      circles.enter()
        .append('circle')
        .attr('r', 4)
        .attr('cx', d => xScale(new Date(d.date)))
        .attr('cy', d => yScale(new Date(d.distance)))
        .attr('fill', '#ccc')

      const xAxis = d3.axisBottom(xScale)
        .ticks(4)
        .tickFormat(d3.timeFormat('%b %d'))
      const yAxis = d3.axisLeft(yScale)
        .ticks(4)
        .tickFormat(d => `${d}m`)
      const xAxisGroup = d3.select('.x-axis')
      xAxisGroup.call(xAxis)

      const yAxisGroup = d3.select('.y-axis')
      yAxisGroup.call(yAxis)

      xAxisGroup.selectAll('text')
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end')
    },

    subscribeToFirebaseUpdates () {
      let data = []
      this.db.collection('activities').onSnapshot(res => {
        res.docChanges().forEach(change => {
          const doc = { ...change.doc.data(), id: change.doc.id }

          switch (change.type) {
            case 'added':
              data.push(doc)
              break
            case 'modified':
              const index = data.findIndex(item => item.id === doc.id)
              data[index] = doc
              break
            case 'removed':
              data = data.filter(item => item.id !== doc.id)
              break
            default:
              break
          }
        })
        this.update(data)
      })
    }

  },

  mounted () {
    this.db = firebase.firestore()
    this.subscribeToFirebaseUpdates()
    this.drawGraph()
  }
}
</script>

<style lang="scss" scoped>
  .graph {
    margin: 40px 20px 50px 50px;
    box-sizing: border-box;
    // This targets the axes (stroke and text, it seems)
    color: #ccc;
  }

  .x-axis path, .y-axis path, .x-axis line, .y-axis line {
    stroke: #ccc;
    color: #ccc;
    // fill: #ccc !important;
  }

  .x-axis text, .y-axis text {
    fill: #ccc !important;
    font-size: 14px;
  }

</style>