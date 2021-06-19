<template>
  <b-container class="project-background grey px-0" fluid>
    <title>Ninja Corp!</title>
    <b-container class="py-3 justify-content-center project-header" fluid>
      <h3 class="text-white">Ninja Corp</h3>
    </b-container>
    <b-container class="py-3 mx-0  project-subtitle" fluid>
        <p class="text-grey">The Number ONE Ninja Company</p>
        <b-button pill v-b-modal.add-employee-modal class="add-button">+</b-button>
    </b-container>
    <add-employee-modal
      id="add-employee-modal"
      :available-managers="roster"
      v-on:add-new-employee="addEmployee"
    />
    <b-toast
      variant="danger"
      id="error-toast"
      title="Entry not submitted"
      ref="error-toast"
    >
      Please provide details on employee
    </b-toast>
    <b-container class="project-main" fluid>
      <b-row class="pt-4">
        <b-col>
          <organization-diagram class="chart" @roster-change="updateRoster"/>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
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
        return
      }
      this.$refs['error-toast'].show()
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
