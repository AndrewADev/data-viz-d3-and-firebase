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
    <form
      @submit="addNewEmployee"
      @reset="clearEmployeeFields"
      ref="add-form"
    >
      <div class="input-group mt-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Name</span>
        </div>
        <input class="form-control" v-model="name" placeholder="Jim Halpert" />
      </div>
      <div
        class="input-group mt-3"
      >
        <div class="input-group-prepend">
          <span class="input-group-text">Manager</span>
        </div>
        <select class="form-control" v-model="parent" @change="managerChanged">
          <option
            v-for="manager in availableManagers"
            :key="manager.id"
            :value="manager.name"
            :disabled="!hasFounder"
          >
          {{manager.name}}
          </option>
        </select>
      </div>
      <div class="input-group mt-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Department</span>
        </div>
        <input
          class="form-control"
          v-model="department"
          placeholder="Sales"
        />
      </div>
      <button class="btn btn-secondary mt-3" type="submit">Add Employee</button>
    </form>
  </b-modal>
</template>

<script>

export default {
  name: 'AddEmployeeModal',
  data () {
    return {
      name: '',
      parent: '',
      department: ''
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
    },

    newEmployee () {
      return {
        name: this.name,
        parent: this.parent,
        department: this.department?.toLowerCase()
      }
    }
  },

  methods: {

    addNewEmployee (e) {
      e.preventDefault()
      this.$emit('add-new-employee', this.newEmployee)
      this.$refs['add-form'].reset()
      this.$refs['main-modal'].hide()
    },

    clearEmployeeFields () {
      this.name = ''
      this.parent = ''
      this.department = ''
    },

    managerChanged (_) {
      const manager = this.availableManagers.find(manager => manager.name === this.parent)

      if (manager) {
        this.department = manager.department
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
