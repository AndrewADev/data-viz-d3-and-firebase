<template>
  <div class="dropdown-menu">
    <router-link v-for="({name, path}, idx) of items" :key="idx" class="dropdown-item" :to="path">{{name}}</router-link>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>
