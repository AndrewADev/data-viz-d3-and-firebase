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
          <b-input v-model="newEmployee.parent" placeholder="Michael Scott"/>
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
    }
  },

  computed: {
  },

  methods: {
    drawGraph () {
    },

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
    }
  },

  mounted () {
    this.drawGraph()
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
