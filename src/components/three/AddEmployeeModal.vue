<template>
  <div
    :id="modalId"
    :static="this.static"
    class="modal"
    ref="main-modal"
    aria-labelledby="add-new-employee-header"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <div class="text-center">
            <h5 id="add-new-employee-header" class="text-pink">Add New Employee</h5>
          </div>
        </div>
        <div class="modal-body">
          <form
            @submit="addNewEmployee"
            @reset="clearEmployeeFields"
            ref="add-form"
            novalidate
          >
            <div class="input-group mt-3">
              <div class="input-group-prepend">
                <span class="input-group-text">Name</span>
              </div>
              <input class="form-control" :class="{'is-invalid': this.touched && !this.isNameValid}" v-model="name" placeholder="Jim Halpert" required/>
              <div class="invalid-feedback">
                Enter the employee's name
              </div>
            </div>
            <div
              class="input-group mt-3"
            >
              <div class="input-group-prepend">
                <span class="input-group-text">Manager</span>
              </div>
              <select
                class="form-control"
                :class="{'is-invalid': this.touched && !this.isParentValid}"
                v-model="parent"
                @change="managerChanged"
                required
              >
                <option
                  v-for="manager in availableManagers"
                  :key="manager.id"
                  :value="manager.name"
                  :disabled="!hasFounder"
                >
                {{manager.name}}
                </option>
              </select>
              <div class="invalid-feedback">
                Enter the manager's name
              </div>
            </div>
            <div class="input-group mt-3">
              <div class="input-group-prepend">
                <span class="input-group-text">Department</span>
              </div>
              <input
                class="form-control"
                :class="{'is-invalid': this.touched && !this.isDeptValid}"
                v-model="department"
                placeholder="Sales"
                required
              />
              <div class="invalid-feedback">
                Enter a department
              </div>
            </div>
            <button class="btn btn-secondary mt-3" type="submit">Add Employee</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import $ from 'jquery'

export default {
  name: 'AddEmployeeModal',
  data () {
    return {
      name: '',
      parent: '',
      department: '',
      touched: false
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

    isNameValid () {
      return this.name !== ''
    },

    isParentValid () {
      return this.parent !== '' || !this.hasFounder
    },

    isDeptValid () {
      return this.department !== ''
    },

    hasValidInput () {
      return this.isNameValid && this.isParentValid && this.isDeptValid
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
      this.touched = true

      if (!this.hasValidInput) return false

      this.$emit('add-new-employee', this.newEmployee)
      this.$refs['add-form'].reset()
      $(`#${this.modalId}`).modal('hide')
    },

    clearEmployeeFields () {
      this.name = ''
      this.parent = ''
      this.department = ''
      this.touched = false
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
