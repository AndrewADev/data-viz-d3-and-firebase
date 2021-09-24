<template>
  <div class="card text-indigo text-left mt-3 mb-3">
    <div class="card-body">
      <h4 class="card-title">Add Item:</h4>
      <form>
        <div class="input-group">
          <div class="input-group mt-1">
            <div class="input-group-prepend">
              <div class="input-group-text">Item Name:</div>
            </div>
            <input id="name" v-model="name" class="form-control" />
          </div>
          <div class="input-group mt-1">
            <div class="input-group-prepend">
              <div class="input-group-text">Item Cost (€):</div>
            </div>
            <input id="cost" v-model="cost" type="number" class="form-control"/>
          </div>
          <button @click="printItem" type="button" class="btn btn-secondary mt-1">Add Item</button>
        </div>
      </form>
    </div>
    <em slot="footer">
      <p id="error" class="text-danger">{{error}}</p>
    </em>
  </div>
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

    printItem (_) {
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
  @import 'node_modules/bootstrap/scss/functions';
  @import 'node_modules/bootstrap/scss/variables';
  @import "node_modules/bootstrap/scss/mixins";

  .text-indigo {
    color: $indigo;
  }
</style>
