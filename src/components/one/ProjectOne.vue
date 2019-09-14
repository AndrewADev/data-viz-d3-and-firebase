<template>
  <b-container class="project-header text-white m-0 h-100" fluid>
    <header class="py-2">
      <h2>Ninja Wonga</h2>
      <span>Monthly money tracker for ninjas...</span>
    </header>
    <b-row class="project-main pt-4">
      <b-col class="col-sm-12 col-md-5">
        <add-budget-item v-on:add-item="addItem"/>
      </b-col>
      <b-col class="col-sm-12 offset-md-1 col-md-5">
        <div class="canvas">
          <svg class="donut-chart" viewbox="0 0 250 250"/>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import * as d3 from 'd3'
import tip from 'd3-tip'
// TODO: document difference
import { legendColor } from 'd3-svg-legend'
import firebase from 'firebase/app'
import 'firebase/firestore'
import AddBudgetItem from './AddBudgetItem'

export default {
  name: 'ProjectOne',
  components: { AddBudgetItem },
  data () {
    return {
      db: {}
    }
  },

  methods: {
    drawGraph () {
      const dims = {
        height: 300,
        width: 300,
        radius: 150
      }
      const cent = {
        x: dims.width / 2 + 5,
        y: dims.height / 2 + 5
      }

      const svg = d3.select('.donut-chart')
        .attr('width', dims.width + 150)
        .attr('height', dims.height + 150)

      const graph = svg.append('g')
        .attr('transform', `translate(${cent.x}, ${cent.y})`)

      const pie = d3.pie()
        .sort(null)
        .value(d => d.cost)

      const arcPath = d3.arc()
        .outerRadius(dims.radius)
        .innerRadius(dims.radius / 2)

      const tooltip = tip()
        .attr('class', 'tip card')
        .html(d => {
          // TODO: Alternative that less messy and doesn't require
          // non-scoped styles
          let content = `<div class="name">${d.data.name}</div>`
          content += `<div class="cost">${d.data.cost}</div>`
          content += `<div class="delete">Click slice to delete</div>`
          return content
        })
      graph.call(tooltip)

      const arcTweenEnter = (d) => {
        let i = d3.interpolate(d.endAngle, d.startAngle)

        return (t) => {
          d.startAngle = i(t)
          return arcPath(d)
        }
      }

      const arcTweenExit = (d) => {
        let i = d3.interpolate(d.startAngle, d.endAngle)

        return (t) => {
          d.startAngle = i(t)
          return arcPath(d)
        }
      }

      function arcTweenUpdate (d) {
        let i = d3.interpolate(this._current, d)
        this._current = i(1)

        return function (t) {
          return arcPath(i(t))
        }
      }

      const color = d3.scaleOrdinal(d3['schemeSet3'])

      const legendGroup = svg.append('g')
        .attr('transform', `translate(${dims.width + 40}, 10)`)

      const legend = legendColor()
        .shape('circle')
        .shapePadding(10)
        .scale(color)

      const transitionToColor = (colorFunc) => (d, i, n) => {
        d3.select(n[i])
          .transition('transitionToFillColor').duration(300)
          .attr('fill', colorFunc(d.data.name))
      }

      const update = (data) => {
        // Update colors used
        color.domain(data.map(d => d.name))

        legendGroup.call(legend)
        legendGroup.selectAll('text').attr('fill', 'white')

        // join enhanced data to path elements
        const paths = graph.selectAll('path')
          .data(pie(data))

        // handle exit
        paths.exit()
          .transition()
          .duration(750)
          .attrTween('d', arcTweenExit)
          .remove()

        // handle updates
        paths.attr('d', arcPath)
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
          .attrTween('d', arcTweenEnter)

        graph.selectAll('path')
          .on('mouseover', (d, i, n) => {
            tooltip.show(d, n[i])
            transitionToColor(() => '#fff')(d, i, n)
          })
          .on('mouseout', (d, i, n) => {
            tooltip.hide()
            transitionToColor(color)(d, i, n)
          })
          .on('click', (d) => {
            const { id } = d.data
            this.db.collection('expenses').doc(id).delete()
          })
      }

      let data = []

      this.db.collection('expenses').onSnapshot(res => {
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
        update(data)
      })
    },

    addItem (newItem) {
      this.db.collection('expenses')
        .add(newItem)
        .then(res => {
          // success message or notification?
        })
        // error handling?
    }
  },

  computed: {
    errorMessage () {
      return this.error
    }
  },

  mounted () {
    this.db = firebase.firestore()

    this.drawGraph()
  }
}
</script>

<style lang="scss" scoped>
  @import 'node_modules/bootstrap/scss/bootstrap';
  @import 'node_modules/bootstrap-vue/src/index.scss';

  .project-header {
    background-color: darken($indigo, 10%);
    width: 100vw;
  }

  .project-main {
    background-color: $indigo;
    height: 100vh;
  }

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
