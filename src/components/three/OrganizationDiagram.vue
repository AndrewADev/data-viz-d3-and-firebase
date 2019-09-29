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
import firebase from 'firebase/app'
import 'firebase/firestore'

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
    update (chartData) {

    },

    subscribeToFirebaseUpdates () {
      let data = []
      this.db.collection('employees').onSnapshot(res => {
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
  }
}
</script>

<style lang="scss" scoped>

</style>
