<template>
  <div class="container-fluid">
    <div class="canvas">
      <svg class="organization-diagram" :viewBox="`0 0 ${totalWidth} ${totalHeight}`">
        <g class="graph"
          :width="graphWidth"
          :height="graphHeight"
          :transform="`translate(${marginLeft}, ${marginTop})`">
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

import { collection, onSnapshot } from 'firebase/firestore'

export default {
  name: 'OrganizationDiagram',

  inject: {
    firestore: {
      default: () => ({})
    }
  },

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
      default: 500
    },
    graphWidth: {
      type: Number,
      default: 1100
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
    stratify () {
      return d3.stratify()
        .id(d => d.name)
        .parentId(d => d.parent)
    },
    tree () {
      return d3.tree()
        .size([this.graphWidth, this.graphHeight])
    },
    color () {
      return d3.scaleOrdinal(d3.schemeTableau10)
    }
  },

  methods: {
    update (chartData) {
      const { color, graph, stratify } = this

      color.domain(chartData.map(d => d.department))

      // Quick n dirty way to prompt update
      graph.selectAll('.node').remove()
      graph.selectAll('.link').remove()

      const rootNode = stratify(chartData)

      const treeData = this.tree(rootNode)

      const nodes = graph.selectAll('.node')
        .data(treeData.descendants())

      const links = graph.selectAll('.link')
        .data(treeData.links())

      links.enter()
        .append('path')
        .attr('class', 'link')
        .attr('fill', 'none')
        .attr('stroke', '#aaa')
        .attr('stroke-width', 2)
        .attr('d', d3.linkVertical()
          .x(d => d.x)
          .y(d => d.y)
        )

      const enterNodes = nodes.enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x}, ${d.y})`)

      enterNodes.append('rect')
        .attr('fill', d => color(d.data.department))
        .attr('stroke', '#555')
        .attr('stroke-width', 2)
        .attr('height', 50)
        .attr('width', d => d.data.name.length * 20)
        .attr('transform', d => `translate(-${d.data.name.length * 10}, -25)`)

      enterNodes.append('text')
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .text(d => d.data.name)

      this.$emit('roster-change', chartData)
    },

    subscribeToFirebaseUpdates () {
      let data = []
      onSnapshot(collection(this.db, 'employees'), res => {
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
  }
}
</script>

<style lang="scss" scoped>

</style>
