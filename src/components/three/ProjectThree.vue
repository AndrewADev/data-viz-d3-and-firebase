<template>
  <div class="container-fluid project-background grey px-0">
    <title>Ninja Corp!</title>
    <div class="container-fluid py-3 justify-content-center project-header">
      <h3 class="text-white">Ninja Corp</h3>
    </div>
    <div class="container-fluid py-3 mx-0  project-subtitle">
      <p class="text-grey">The Number ONE Ninja Company</p>
      <button
        data-toggle="modal"
        data-target="#add-employee-modal"
        class="rounded-pill btn btn-secondary add-button">+</button>
    </div>
    <add-employee-modal
      modalId="add-employee-modal"
      :available-managers="roster"
      v-on:add-new-employee="addEmployee"
    />
    <div class="container-fluid project-main">
      <div class="row pt-4">
        <div class="col">
          <organization-diagram class="chart" @roster-change="updateRoster"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddEmployeeModal from './AddEmployeeModal'
import OrganizationDiagram from './OrganizationDiagram'

export default {
  name: 'ProjectThree',
  components: { AddEmployeeModal, OrganizationDiagram },
  data () {
    return {
      db: {},
      roster: [],
      error: ''
    }
  },

  computed: {
  },

  methods: {
    addEmployee (employee) {
      if (employee && employee.name && employee.department) {
        this.db.collection('employees').add(employee)
      }
    },

    updateRoster (newRoster) {
      this.roster = newRoster
    }
  },

  mounted () {
    this.db = this.$firestore
  }

}
</script>

<style lang="scss" scoped>
  @import './styles';

  .add-button {
    position: relative;
    top: -0.5rem;
    left: 40vw;
  }

  .project-header {
    background-color: $darkpink;
  }

  .project-subtitle {
    background-color: $gray-300;
    max-height: 4rem;
  }

  .project-main {
    background-color: #fbfbfb;
    min-height: 100vh;
    width: 100%;
  }

</style>
