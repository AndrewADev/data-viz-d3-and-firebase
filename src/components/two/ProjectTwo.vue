<template>
  <b-container class="project-background grey px-0" fluid>
    <b-container class="py-3 justify-content-center">
      <h3 class="text-white">- The Dojo -</h3>
    </b-container>
    <b-container class="project-main" fluid>
      <b-container class="py-2 gray-text-light">
        <p>A fitness tracker for ninjas</p>
      </b-container>
      <b-row class="pt-4">
        <b-col class="col-sm-12 col-md-5">
        <b-button block @click="setGraphView(0)" :pressed.sync="options[0].state" value="cycling">Cycling</b-button>
        <b-button block @click="setGraphView(1)" :pressed.sync="options[1].state" value="running">Running</b-button>
        <b-button block @click="setGraphView(2)" :pressed.sync="options[2].state" value="swimming">Swimming</b-button>
        <b-button block @click="setGraphView(3)" :pressed.sync="options[3].state" value="walking">Walking</b-button>
        </b-col>
        <b-col class="col-sm-12 col-lg-6">
        </b-col>
      </b-row>
      <b-row >
        <b-col class="offset-md-3 col-md-6">
          <b-form class="mt-4">
            <p class="gray-text-light justify-content-center">How much <span class="activity">{{activity}}</span> have you done today?</p>
            <b-input type="text" :id="activity" class="gray-text-light" placeholder="Distance in m"/>
            <b-alert variant="danger" class="mt-2" >{{error}}</b-alert>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
    </b-container>
</template>

<script>
// import * as d3 from 'd3'

import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  name: 'ProjectTwo',
  data () {
    return {
      db: {},
      activity: 'cycling',
      options: [
        { activity: 'cycling', state: true },
        { activity: 'running', state: false },
        { activity: 'swimming', state: false },
        { activity: 'walking', state: false }
      ],
      error: ''
    }
  },

  methods: {
    drawGraph () {
    },

    addItem (newItem) {
    },

    setGraphView (selectedIdx) {
      this.options.filter((opt, idx) => idx !== selectedIdx)
        .forEach(opt => { opt.state = false })
      this.activity = this.options[selectedIdx].activity

      // multiple presses should not disable in our case
      if (!this.options[selectedIdx].state) {
        this.options[selectedIdx].state = true
      }
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

  $teal-highlight: #00bfa5;

  .project-background {
    background-color: $gray-800;
    min-width: 100vw;
  }

  .project-main {
    background-color: $gray-900;
    height: 100vh;
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
