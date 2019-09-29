<template>
      <b-modal
      :id="modalId"
      centered
      hide-footer
      hide-header=""
    >
      <div class="text-center">
        <h5 class="text-pink">Add New Employee</h5>
      </div>
      <div>
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
          <b-input v-model="newEmployee.department" placeholder="Sales"/>
        </b-input-group>
      </div>
      <b-btn class="mt-3">Add Employee</b-btn>
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
    }
  },

  computed: {
  },

  methods: {
    drawGraph () {

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
