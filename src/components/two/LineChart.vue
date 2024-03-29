<template>
  <div class="container-fluid">
    <div class="canvas">
      <svg class="line-chart" :width="totalWidth" :height="totalHeight">
        <g class="graph"
          :width="graphWidth"
          :height="graphHeight"
          :transform="`translate(${marginLeft}, ${marginTop})`">
          <g class="x-axis" :transform="`translate(0, ${graphHeight})`"/>
          <g class="y-axis"/>
          <path id="data-line" />
          <g class="dotted-lines">
            <path id="x-hover" class="hover-line"/>
            <path id="y-hover" class="hover-line"/>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>

import * as d3 from 'd3'
import { collection, onSnapshot } from 'firebase/firestore'

import { ACTIVITY } from './constants'

export default {
  name: 'LineChart',

  inject: {
    firestore: {
      default: () => ({})
    }
  },

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
    activity: {
      type: String,
      default: ACTIVITY.CYCLING
    },
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
    lineGenerator () {
      const vm = this
      return d3.line()
        .x(d => vm.xScale(new Date(d.date)))
        .y(d => vm.yScale(d.distance))
    },
    path () {
      return d3.select('#data-line')
    },
    xHover () {
      return d3.select('#x-hover')
    },
    yHover () {
      return d3.select('#y-hover')
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
      const vm = this
      const { xScale, yScale, graph } = vm

      chartData = chartData.filter(item => item.activity === this.activity)

      // Sort chronologically
      chartData.sort((a, b) => new Date(a.date) - new Date(b.date))

      xScale.domain(d3.extent(chartData, d => new Date(d.date)))
      yScale.domain([0, d3.max(chartData, d => d.distance)])

      // update path data
      this.path.data([chartData])
        .attr('fill', 'none')
        .attr('stroke', '#00bfa5')
        .attr('stroke-width', 2)
        .attr('d', vm.lineGenerator)

      // Create circles for objects
      const circles = graph.selectAll('circle')
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

      graph.selectAll('circle')
        .on('mouseover', (d, i, n) => {
          const xHoverData = [
            { ...d, distance: 0 },
            d
          ]
          const yHoverData = [
            { ...d, date: d3.min(chartData, d => new Date(d.date)) },
            d
          ]

          d3.select(n[i])
            .transition()
            .duration(100)
            .attr('r', 8)
            .attr('fill', '#fff')
          vm.xHover
            .data([xHoverData])
            .attr('opacity', 1)
            .attr('d', vm.lineGenerator)
          vm.yHover
            .data([yHoverData])
            .attr('opacity', 1)
            .attr('d', vm.lineGenerator)
        })
        .on('mouseout', (d, i, n) => {
          d3.select(n[i])
            .transition()
            .duration(200)
            .attr('r', 4)
            .attr('fill', '#ccc')
          vm.xHover.attr('opacity', 0)
          vm.yHover.attr('opacity', 0)
        })

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
      onSnapshot(collection(this.db, 'activities'), res => {
        res.docChanges().forEach(change => {
          const doc = { ...change.doc.data(), id: change.doc.id }

          switch (change.type) {
            case 'added':
              data.push(doc)
              break
            case 'modified': {
              const index = data.findIndex(item => item.id === doc.id)
              data[index] = doc
              break
            }
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
    this.db = this.firestore
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

  .hover-line {
    fill: none;
    stroke: #777;
    stroke-width: 2;
    stroke-dasharray: (4, 4);
  }

  .x-axis path, .y-axis path, .x-axis line, .y-axis line {
    stroke: #ccc;
    color: #ccc;
  }

  .x-axis text, .y-axis text {
    fill: #ccc !important;
    font-size: 14px;
  }

</style>
