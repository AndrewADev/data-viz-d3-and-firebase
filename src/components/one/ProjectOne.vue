<template>
  <div class="container-fluid project-header text-white m-0 h-100" fluid>
    <header class="py-2">
      <h2>Ninja Wonga</h2>
      <span>Monthly money tracker for ninjas...</span>
    </header>
    <div class="row project-main pt-4">
      <div class="col col-sm-12 col-md-5">
        <add-budget-item v-on:add-item="addItem"/>
      </div>
      <div class="col col-sm-12 col-md-5">
        <donut-chart />
      </div>
    </div>
  </div>
</template>

<script>
import AddBudgetItem from './AddBudgetItem.vue'
import DonutChart from './DonutChart.vue'
import { collection, addDoc } from 'firebase/firestore'

export default {
  name: 'ProjectOne',
  components: { AddBudgetItem, DonutChart },

  inject: {
    firestore: {
      default: () => ({})
    }
  },

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
      addDoc(collection(this.db, 'expenses'), newItem)
        .then(_ => {
          // success message or notification?
        })
        // error handling?
    }
  },

  computed: {
  },

  mounted () {
    this.db = this.firestore

    this.drawGraph()
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/theming';

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
