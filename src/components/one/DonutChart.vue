<template>
  <div class="canvas">
    <svg class="donut-chart" viewbox="0 0 250 250">
      <g id="chart-group" :transform="`translate(${cent.x}, ${cent.y})`"/>
      <g id="legend-group" :transform="`translate(${this.width + 40}, 10)`"/>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import tip from 'd3-tip'
// TODO: document difference
import { legendColor } from 'd3-svg-legend'

import { collection, doc, deleteDoc, onSnapshot } from 'firebase/firestore'

export default {
  name: 'DonutChart',

  inject: {
    firestore: {
      default: () => ({})
    }
  },

  props: {
    height: {
      type: Number,
      default: 300
    },
    width: {
      type: Number,
      default: 300
    },
    radius: {
      type: Number,
      default: 150
    }
  },

  data () {
    return {
      chartData: [],
      tooltip: {}
    }
  },

  computed: {
    cent () {
      return {
        x: this.width / 2 + 5,
        y: this.height / 2 + 5
      }
    },

    svg () {
      return d3.select('.donut-chart')
    }
  },

  methods: {

    arcTweenEnter (d) {
      const i = d3.interpolate(d.endAngle, d.startAngle)

      return (t) => {
        d.startAngle = i(t)
        return this.arcPath(d)
      }
    },

    arcTweenExit (d) {
      const i = d3.interpolate(d.startAngle, d.endAngle)

      return (t) => {
        d.startAngle = i(t)
        return this.arcPath(d)
      }
    },

    initializeChart () {
      this.svg.attr('width', this.width + 150)
        .attr('height', this.height + 150)
      const graph = this.svg.select('g#chart-group')

      this.tooltip = tip()
        .attr('class', 'tip card')
        .html(d => {
          // TODO: Alternative that less messy and doesn't require
          // non-scoped styles
          let content = `<div class="name">${d.data.name}</div>`
          content += `<div class="cost">${d.data.cost}</div>`
          content += '<div class="delete">Click slice to delete</div>'
          return content
        })
      graph.call(this.tooltip)
    },

    update (data) {
      const vm = this
      function arcTweenUpdate (d) {
        const i = d3.interpolate(this._current, d)
        this._current = i(1)

        return function (t) {
          return vm.arcPath(i(t))
        }
      }

      const graph = d3.select('g')

      const color = d3.scaleOrdinal(d3.schemeSet3)

      const legendGroup = d3.select('g#legend-group')

      const legend = legendColor()
        .shape('circle')
        .shapePadding(10)
        .scale(color)

      const transitionToColor = (colorFunc) => (d, i, n) => {
        d3.select(n[i])
          .transition('transitionToFillColor').duration(300)
          .attr('fill', colorFunc(d.data.name))
      }

      // Update colors used
      color.domain(data.map(d => d.name))

      legendGroup.call(legend)
      legendGroup.selectAll('text').attr('fill', 'white')

      // join enhanced data to path elements
      const paths = graph.selectAll('path')
        .data(this.pie(data))

      // handle exit
      paths.exit()
        .transition()
        .duration(750)
        .attrTween('d', vm.arcTweenExit)
        .remove()

      // handle updates
      paths.attr('d', vm.arcPath)
        .transition().duration(750)
        .attrTween('d', arcTweenUpdate)

      paths.enter()
        .append('path')
        .attr('class', 'arc')
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)
        .attr('fill', d => color(d.data.name))
      // This is suggested by the tutorial, so that
      // we can stash away a snapshot of each data
      // object for later comparison during render
        .each(function (d) {
          this._current = d
        })
        .transition().duration(750)
        .attrTween('d', vm.arcTweenEnter)

      graph.selectAll('path')
        .on('mouseover', (d, i, n) => {
          this.tooltip.show(d, n[i])
          transitionToColor(() => '#fff')(d, i, n)
        })
        .on('mouseout', (d, i, n) => {
          this.tooltip.hide()
          transitionToColor(color)(d, i, n)
        })
        .on('click', (d) => {
          const { id } = d.data
          deleteDoc(doc(this.db, 'expenses', id))
        })
    },

    subscribeFirebaseUpdates () {
      onSnapshot(collection(this.db, 'expenses'), res => {
        res.docChanges().forEach(change => {
          const doc = { ...change.doc.data(), id: change.doc.id }
          switch (change.type) {
            case 'added':
              this.chartData.push(doc)
              break
            case 'modified': {
              const index = this.chartData.findIndex(item => item.id === doc.id)
              this.chartData[index] = doc
              break
            }
            case 'removed':
              this.chartData = this.chartData.filter(item => item.id !== doc.id)
              break
            default:
              break
          }
        })
        this.update(this.chartData)
      })
    },

    // emitItemDelete (itemId) {
    //   this.$emit('delete-item', itemId)
    //   // this.update(this.chartData)
    // },

    arcPath (d) {
      return d3.arc()
        .outerRadius(this.radius)
        .innerRadius(this.radius / 2)(d)
    },

    pie (d) {
      return d3.pie()
        .sort(null)
        .value(d => d.cost)(d)
    }
  },

  mounted () {
    this.db = this.firestore
    this.initializeChart()
    this.subscribeFirebaseUpdates()
  }
}
</script>

<style lang="scss" scoped>
</style>

// TODO: Fix. This is needed to style the tooltip we create dynamically
<style lang="scss">
  .tip {
    padding: 10px;
    background: #333 !important;
    color: #fff;
    .delete {
      color: hotpink;
      font-size: 0.8em;
    }
  }
</style>
