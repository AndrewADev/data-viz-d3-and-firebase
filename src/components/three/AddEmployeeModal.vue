<template>
      <b-modal
      :id="modalId"
      :static="this.static"
      centered
      hide-footer
      hide-header
      ref="main-modal"
    >
      <div class="text-center">
        <h5 class="text-pink">Add New Employee</h5>
      </div>
      <b-form
        @submit="addNewEmployee"
        @reset="clearEmployeeFields"
        ref="add-form"
      >
        <b-input-group
          prepend="Name"
          class="mt-3"
        >
          <b-input v-model="newEmployee.name" placeholder="Jim Halpert"/>
        </b-input-group>
        <b-input-group
          prepend="Manager"
          class="mt-3"
        >
          <b-form-select v-model="newEmployee.parent" @change="managerChanged">
            <option
              v-for="manager in availableManagers"
              :key="manager.id"
              :value="manager.name"
              :disabled="!hasFounder"
            >
            {{manager.name}}
            </option>
          </b-form-select>
        </b-input-group>
        <b-input-group
          prepend="Department"
          class="mt-3"
        >
          <b-input
            :formatter="toLowerCase"
            v-model="newEmployee.department"
            placeholder="Sales"
            lazy-formatter
          />
        </b-input-group>
      <b-btn class="mt-3" type="submit">Add Employee</b-btn>
      </b-form>
    </b-modal>
</template>

<script>

export default {
  name: 'AddEmployeeModal',
  data () {
    return {
      newEmployee: {
        name: '',
        parent: '',
        department: ''
      }
    }
  },

  props: {
    modalId: {
      type: String,
      default: 'add-employee-modal'
    },
    // Needed for testing, see: https://stackoverflow.com/a/58539818
    static: {
      type: Boolean,
      default: false
    },
    availableManagers: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    /**
     * Is there at least one employee available? (A founder)
     */
    hasFounder () {
      return this.availableManagers.length > 0
    }
  },

  methods: {

    toLowerCase (value, event) {
      return value.toLowerCase()
    },

    addNewEmployee (e) {
      e.preventDefault()
      this.$emit('add-new-employee', this.newEmployee)
      this.$refs['add-form'].reset()
      this.$refs['main-modal'].hide()
    },

    clearEmployeeFields () {
      this.newEmployee.name = ''
      this.newEmployee.parent = ''
      this.newEmployee.department = ''
    },

    managerChanged (oEvent) {
      const manager = this.availableManagers.find(manager => manager.name === oEvent)

      if (manager) {
        this.newEmployee.department = manager.department
      }
    }
  },

  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  @import './styles';

  .input-group-text::after {
    content: ':';
  }

  .text-pink {
    color: $darkpink;
  }
</style>
