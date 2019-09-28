<template>
  <b-container fluid>
    <div class="canvas">
      <svg class="line-chart" :width="graphWidth" :height="graphHeight">
        <g class="graph"
          :width="graphWidth - marginLeft - marginRight"
          :height="graphHeight - marginTop - marginRight">
          <g class="x-axis" :transform="`translate(0, ${graphHeight - marginBottom})`"/>
          <g class="y-axis" :transform="`translate(40, 0)`"/>
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
      marginLeft: 100,
      db: {}
    }
  },

  props: {
    graphHeight: {
      type: Number,
      default: 400
    },
    graphWidth: {
      type: Number,
      default: 560
    }
  },

  computed: {
    totalWidth () {
      return this.graphWidth + this.marginRight + this.marginLeft
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
      // function arcTweenUpdate (d) {
      //   return function (t) {
      //   }
      // }
    },

    update (chartData) {
      const { xScale, yScale } = this
      console.info('xScale', xScale)
      xScale.domain(d3.extent(chartData, d => new Date(d.date)))
      yScale.domain([0, d3.max(chartData, d => d.distance)])

      const xAxis = d3.axisBottom(xScale)
        .ticks(4)
        .tickFormat(d3.timeFormat('%b %d'))
      const yAxis = d3.axisLeft(yScale)
        .ticks(4)
        .tickFormat(d => `${d} m`)
      const xAxisGroup = d3.select('.x-axis')
      console.info('xAxis group', xAxisGroup)
      xAxisGroup.call(xAxis)

      const yAxisGroup = d3.select('.y-axis')
      yAxisGroup.call(yAxis)

      xAxisGroup.selectAll('text')
      // TODO: CSS?
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end')
    },

    // arcTweenEnter (d) {
    //   return (t) => {

    //   }
    // },

    // arcTweenExit (d) {
    //   return (t) => {

    //   }
    // },

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
    margin: 40px 20px 50px 100px;
    box-sizing: border-box;
  }

  .x-axis path, .y-axis path, .x-axis line, .y-axis line {
    // stroke: #ccc !important;
    // fill: #ccc !important;
  }

  .x-axis, .y-axis, .x-axis, .y-axis {
    stroke: #ccc !important;
    stroke-width: 1px;
    fill: #ccc !important;
  }

  .x-axis text, .y-axis text {
    fill: #ccc !important;
    font-size: 14px;
  }

</style>
