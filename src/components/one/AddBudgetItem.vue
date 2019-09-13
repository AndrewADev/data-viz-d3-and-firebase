<template>
  <b-card
    title="Add Item:"
    class="text-indigo text-left mt-3 mb-3"
    >
    <b-form>
      <b-input-group>
        <b-input-group prepend="Item Name:" class="mt-1">
          <b-form-input id="name" v-model="name"></b-form-input>
        </b-input-group>
        <b-input-group prepend="Item Cost (€):" class="mt-1">
          <b-form-input id="cost" v-model="cost"></b-form-input>
        </b-input-group>
        <b-btn @click="printItem" class="mt-1">Add Item</b-btn>

      </b-input-group>
    </b-form>
    <em slot="footer">
      <p id="error" class="text-danger">{{error}}</p>
    </em>
  </b-card>
</template>

<script>
export default {
  name: 'AddBudgetItem',

  data () {
    return {
      cost: 0,
      name: '',
      error: ''
    }
  },

  computed: {
    errorMessage () {
      return this.error
    }
  },

  methods: {

    printItem (event) {
      if (this.cost && this.name) {
        const newItem = {
          name: this.name,
          cost: parseInt(this.cost)
        }
        this.$emit('add-item', newItem)
        this.error = ''
        this.name = ''
        this.cost = 0
      } else {
        this.error = 'Please enter valid values'
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  @import 'node_modules/bootstrap/scss/bootstrap';
  @import 'node_modules/bootstrap-vue/src/index.scss';

  .text-indigo {
    color: $indigo;
  }
</style>
