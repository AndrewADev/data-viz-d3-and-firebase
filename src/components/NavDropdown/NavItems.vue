<template>
  <ul class="nav p-2">
    <li
      v-for="({name, path}, idx) of rootLinks"
        :key="idx"
        class="nav-item"
    >
      <router-link
        class="nav-link"
        :class="{active: idx === 0}"
        :to="path"
      >
          {{ name }}
      </router-link>
    </li>
    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{{ dropdownName }}</a>
    <NavDropdown :items="dropdownLinks" />
  </ul>
</template>

<script setup>
import { defineProps } from 'vue'
import NavDropdown from './NavDropdown.vue'

defineProps({
  rootLinks: {
    type: Array,
    default: () => []
  },
  dropdownName: String,
  dropdownLinks: {
    type: Array,
    default: () => []
  }
})

</script>
