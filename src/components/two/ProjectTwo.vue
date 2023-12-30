<template>
  <div class="container-fluid project-background grey px-0">
    <div class="container py-3 justify-content-center">
      <h3 class="text-white">- The Dojo -</h3>
    </div>
    <div class="container-fluid project-main">
      <div class="container py-2 gray-text-light">
        <p>A fitness tracker for ninjas</p>
      </div>
      <div class="row pt-4">
        <div class="col col-sm-12 col-md-5">
          <button @click="setGraphView(0)" value="cycling" type="button" class="btn btn-secondary btn-block form-control" :class="{active: options[0].state}" :aria-pressed="options[0].state">Cycling</button>
          <button @click="setGraphView(1)" value="running" type="button" class="btn btn-secondary btn-block form-control" :class="{active: options[1].state}" :aria-pressed="options[1].state">Running</button>
          <button @click="setGraphView(2)" value="swimming" type="button" class="btn btn-secondary btn-block form-control" :class="{active: options[2].state}" :aria-pressed="options[2].state">Swimming</button>
          <button @click="setGraphView(3)" value="walking" type="button" class="btn btn-secondary btn-block form-control" :class="{active: options[3].state}" :aria-pressed="options[3].state">Walking</button>
        </div>
        <div class="col col-sm-12 col-lg-6">
          <line-chart :activity="activity" :key="activity"/>
        </div>
      </div>
      <div class="row">
        <div class="col offset-md-3 col-md-6">
          <form class="my-4" @submit="newItem" novalidate>
              <p class="gray-text-light justify-content-center">How much <span class="activity">{{activity}}</span> have you done today?</p>
              <input
                type="number"
                required
                aria-invalid="Distance is required"
                :id="activity"
                class="form-control gray-text-light"
                v-model="distance"
                :class="{'is-valid': hasValidDistance, 'is-invalid': distance && !hasValidDistance}"
                min="0"
                placeholder="Distance in m"
              />
              <div class="invalid-feedback">
                Enter a positive number
              </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from './LineChart.vue'
import { collection, addDoc } from 'firebase/firestore'

import { ACTIVITY } from './constants'

export default {
  name: 'ProjectTwo',
  components: { LineChart },

  inject: {
    firestore: {
      default: () => ({})
    }
  },

  data () {
    return {
      db: {},
      activity: ACTIVITY.CYCLING,
      distance: null,
      isValidDistance: null,
      options: [
        { activity: ACTIVITY.CYCLING, state: true },
        { activity: ACTIVITY.RUNNING, state: false },
        { activity: ACTIVITY.SWIMMING, state: false },
        { activity: ACTIVITY.WALKING, state: false }
      ],
      error: ''
    }
  },

  computed: {
    hasValidDistance () {
      return !Number.isNaN(Number.parseFloat(this.distance)) && this.distance > 0
    }
  },

  methods: {
    drawGraph () {
    },

    newItem (event) {
      event.preventDefault()
      this.isValidDistance = this.hasValidDistance

      if (this.hasValidDistance) {
        addDoc(collection(this.db, 'activities'), {
          activity: this.activity,
          distance: Number.parseInt(this.distance),
          date: new Date().toString()
        }).then(() => {
          this.distance = null
          this.isValidDistance = null
        })
      }
    },

    setGraphView (selectedIdx) {
      this.options.filter((_, idx) => idx !== selectedIdx)
        .forEach(opt => { opt.state = false })
      this.activity = this.options[selectedIdx].activity

      // multiple presses should not disable in our case
      if (!this.options[selectedIdx].state) {
        this.options[selectedIdx].state = true
      }
    }
  },

  mounted () {
    this.db = this.firestore

    this.drawGraph()
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/theming';

  $teal-highlight: #00bfa5;

  .project-background {
    background-color: $gray-800;
    min-width: 100vw;
  }

  .project-main {
    background-color: $gray-900;
    min-height: 100vh;
    width: 100%;
  }

  .gray-text-light {
    color: $gray-400;
  }

  button.active, button:target {
    background: $teal-highlight !important;
  }

  .highlighted {
    background: $teal-highlight !important;
  }

  .activity {
    color: $teal-highlight !important;
  }

</style>
