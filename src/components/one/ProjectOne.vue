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
      <b-col class="col-sm-12 col-md-5">
        <donut-chart />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// TODO: document difference
import firebase from 'firebase/app'
import 'firebase/firestore'
import AddBudgetItem from './AddBudgetItem'
import DonutChart from './DonutChart'

export default {
  name: 'ProjectOne',
  components: { AddBudgetItem, DonutChart },
  data () {
    return {
      db: {},
      graphData: [],
      isDataLoaded: false
    }
  },

  methods: {
    drawGraph () {

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
    min-height: 120vh;
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
